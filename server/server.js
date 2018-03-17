const express = require('express')
const http = require('http')
var cors = require('cors')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()
//enables all cors requests
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

const server = http.createServer(app)
const io = socketIO(server)

var sessions = []
var rooms = []



io.on('connection', socket => {

  //connect message
  sessionConnectedDisconnected(socket.id, true)

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    const room = socketByID(socket.id)["lobby"];
    sessionConnectedDisconnected(socket.id, false);
    //sends update to everyone else in the room
    io.sockets.in(room).emit('USERDISCONNECT', {
      "currentSessions": getSessionNames(roomSession(room)),
    });
  })

  //Create a new game lobby
  socket.on('create-lobby', (data) => {
    //data has schema
    /**
     * type, newUser, payload (message), meta
     */
    const lobbyName= getRandomRoom(5);
    rooms.push(lobbyName);
    socket.join(lobbyName);

    //set the session with that ID to have joined the lobby
    socketByID(socket.id)["lobby"] = lobbyName;
    socketByID(socket.id)["name"] = data.name ;

    console.log("CREATED LOBBY: "+  data.name + " ("+ socket.id +') Created Lobby: '+ lobbyName);

    //sends room info to newly connected
    io.to(socket.id).emit('LOADROOM', {
      "currentSessions": getSessionNames(roomSession(lobbyName)),
      "sessionID": socket.id,
      "lobbyName": lobbyName,
      "active": true
    });

    printSessions();
    printRooms();
  });

//Join a game lobby
socket.on('join-lobby', (data) => {
  //data has schema
  /**
   * type, name, lobbyname, meta
   */
  const lobbyName= data.lobbyname; 

  //if lobby does not exist, return a different message
  if(!rooms.includes(lobbyName)){
    io.to(socket.id).emit('JOINROOMFAILED', {
      "message": "Room does not exist"
    });
    console.log("JOIN FAILED: "+ data.name + " ("+ socket.id +') Could not join '+ lobbyName);
    return;
  }
  socket.join(lobbyName);

  //set the session with that ID to have joined the lobby
  socketByID(socket.id)["lobby"] = lobbyName;
  socketByID(socket.id)["name"] = data.name;
  console.log("JOINED LOBBY: "+ data.name + " ("+ socket.id +') Joined Lobby: '+ lobbyName);

  //sends room info to newly connected
  io.to(socket.id).emit('LOADROOM', {
    "currentSessions": getSessionNames(roomSession(lobbyName)),
    "sessionID": socket.id,
    "lobbyName": lobbyName,
    "active": true
  });

  //sends update to everyone else in the room
  io.sockets.in(lobbyName).emit('USERJOINED', {
    "currentSessions": getSessionNames(roomSession(lobbyName)),
  });

  printSessions();
  printRooms();
});

//User sends a message to game lobby
socket.on('send-message', (data) => {
  //data has schema
  /**
   * type, message, meta
   */
  const lobbyName= socketByID(socket.id)["lobby"]; 

  //sends message to everyone else in the room
  io.sockets.in(lobbyName).emit('MESSAGERECEIVED', {
    "message": data["message"],
  });

  console.log("SEND MESSAGE: ("+ socket.id +') Sent message to '+ lobbyName);
});

})

server.listen(port, () => console.log(`Listening on port ${port}`))

function sessionConnectedDisconnected(socketID, connect){
  //handles new connections and disconnects
  if(connect){
    sessions.push({id: socketID});
    console.log('CONNECT: Session '+  socketID +' Connected');
  }else{
    const room = socketByID(socketID)["lobby"];
    sessions = sessions.filter(x => x.id !== socketID);

    //delete the room if there is nobody in it
    if(roomSession(room).length == 0){
      rooms = rooms.filter(x => x !== room)
    }
    console.log('DISCONNECT: Session '+  socketID +' Disconnected');
  }
  printSessions();
  printRooms();
}

function printSessions(){
    //print all current sessions
    sessions_in_string = '['
    for(let i = 0; i < sessions.length; i++){
      sessions_in_string +=  JSON.stringify(sessions[i]) + ', ';
    }
    sessions_in_string += ']';
    console.log('PRINT: Current sessions:' + sessions_in_string);
}


function printRooms(){
  //print all current Rooms
  rooms_in_string = '['
  for(let i = 0; i < rooms.length; i++){
    rooms_in_string +=  rooms[i] + ', ';
  }
  rooms_in_string += ']';
  console.log('PRINT: Current Rooms:' + rooms_in_string);
}

//returns the session by socket id
function socketByID(id){
  return sessions.find(x => x.id === id);
}

//returns all the sessions in a room
function roomSession(roomName){
  return sessions.filter(x => x.lobby === roomName);
}

//formats sessions in a list of objects
function getSessionNames(session_array){
  formatted = [];
  for(let i = 0; i < session_array.length; i++){
    formatted.push({
      "id": session_array[i]["id"],
      "name": session_array[i]["name"],
    });
  }
  return formatted;
}

//generat random room name of length n
function getRandomRoom(n){
  let text ="";
  let possibble = possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < n; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}