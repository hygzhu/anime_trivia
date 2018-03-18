const express = require('express')
const http = require('http')
var cors = require('cors')
const socketIO = require('socket.io')

const animelist = require('./animelist.json')

// our localhost port
const port = 4001

const app = express()
//enables all cors requests
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

const server = http.createServer(app)

//workaround to bug https://github.com/socketio/socket.io/issues/3179
//Needs to define ws engine or events are super slow
const io = socketIO(server, (http, { wsEngine: 'ws' }))

var sessions = []
var rooms = []
var games = []

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
    const lobbyName = getRandomRoom(5);
    rooms.push(lobbyName);
    socket.join(lobbyName);

    //set the session with that ID to have joined the lobby
    socketByID(socket.id)["lobby"] = lobbyName;
    socketByID(socket.id)["name"] = data.name;
    socketByID(socket.id)["ready"] = false;
    console.log("CREATED LOBBY: " + data.name + " (" + socket.id + ') Created Lobby: ' + lobbyName);

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
    const lobbyName = data.lobbyname;

    //if lobby does not exist, return a different message
    if (!rooms.includes(lobbyName)) {
      io.to(socket.id).emit('JOINROOMFAILED', {
        "message": "Room does not exist"
      });
      console.log("JOIN FAILED: " + data.name + " (" + socket.id + ') Could not join ' + lobbyName);
      return;
    }
    socket.join(lobbyName);

    //set the session with that ID to have joined the lobby
    socketByID(socket.id)["lobby"] = lobbyName;
    socketByID(socket.id)["name"] = data.name;
    socketByID(socket.id)["ready"] = false;
    console.log("JOINED LOBBY: " + data.name + " (" + socket.id + ') Joined Lobby: ' + lobbyName);

    //sends room info to newly connected
    io.to(socket.id).emit('LOADROOM', {
      "currentSessions": getSessionNames(roomSession(lobbyName)),
      "sessionID": socket.id,
      "lobbyName": lobbyName,
      "active": true,
      "roomReady": false,
    });

    //sends update to everyone else in the room
    io.sockets.in(lobbyName).emit('USERJOINED', {
      "currentSessions": getSessionNames(roomSession(lobbyName)),
      "roomReady": false,
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
    const lobbyName = socketByID(socket.id)["lobby"];

    //sends message to everyone else in the room
    io.sockets.in(lobbyName).emit('MESSAGERECEIVED', {
      "message": data["message"],
    });

    console.log("SEND MESSAGE: (" + socket.id + ') Sent message to ' + lobbyName);
  });

  //User readies up
  socket.on('player-ready', (data) => {
    //data has schema
    /**
     * type, meta
     */
    const lobbyName = socketByID(socket.id)["lobby"];
    socketByID(socket.id)["ready"] = !socketByID(socket.id)["ready"];

    //check if everyone in the room is ready
    let ready = isRoomReady(lobbyName);

    //Notifies everyone else in the room
    io.sockets.in(lobbyName).emit('ROOMREADY', {
      "currentSessions": getSessionNames(roomSession(lobbyName)),
      "roomReady": ready
    });
    console.log("READYUP: (" + socket.id + ') Changed in lobby: ' + lobbyName);

    //if room is ready we want to emit a message with game info to start the game
    if (ready) {

      //change ready status of everyone in the room the false (to allow answering question)
      setSessionAttribute(lobbyName, "ready", false);

      let trivia_data = getTrivia(4);

      //add game session data
      let game_session_data = []
      let sessions_in_room = roomSession(lobbyName);
      for (let i = 0; i < sessions_in_room.length; i++) {
        let data = {
          "id": sessions_in_room[i]["id"],
          "name": sessions_in_room[i]["name"],
          "score": 0,
        };
        game_session_data.push(data);
      }
      games.push({ room: lobbyName, trivia: trivia_data, sessions: game_session_data});

      //sends info for new round
      let game_data= {
        "currentSessions": getSessionNames(roomSession(lobbyName)),
        "roomReady": ready,
        "trivia": trivia_data,
        "gameActive": true,
        "ready": true,
        "game": game_session_data,
      };
      io.sockets.in(lobbyName).emit('ROUNDSTART', game_data);
      
      printGames();

      //Goes to next round in 30 seconds
      let roundLoop = setInterval(
        function () {
          if (roomSession(lobbyName).length == 0) {
            console.log("ROUND LOOP ENDED")
            clearInterval(roundLoop);
          }else{
            console.log("ROUND LOOP")
            trivia_data = getTrivia(4);
            game_data = {
              "currentSessions": getSessionNames(roomSession(lobbyName)),
              "roomReady": ready,
              "trivia": trivia_data,
              "gameActive": true,
              "ready": true,
              "game": games.find(x=> x.room == lobbyName)["sessions"]
            };
            //update games
            games = games.map(x => x.room == lobbyName ? {...x, trivia: trivia_data} : x)
            printGames();
            io.sockets.in(lobbyName).emit('ROUNDSTART', game_data)
          }
        }, 15000);
    }
  });

  //User submits an answer to a game
  socket.on('submit-answer', (data) => {
    //data has schema
    /**
     * type, answer, meta
     */
    const lobbyName = socketByID(socket.id)["lobby"];
    const current_game = games.find(x => x.room == lobbyName);
    let updated_game = current_game;
    //checks if answer is correct and update the score of that session in the score
    console.log(data["answer"] + " : " + current_game["trivia"]["animeName"] )
    if(data["answer"] == current_game["trivia"]["animeName"]){
      updated_game = {
        ...current_game,
        sessions: current_game["sessions"].map(
          x => x.id == socket.id ?  {...x, score: x.score + 10} : x)
      }
      games = games.map(x => x.room == lobbyName ? updated_game : x)
    }
    //update session readyness
    sessions = sessions.map(x => x["id"] == socket.id ? { ...x, ready: false} : x);

    //lets all the session in that room what the game state is
    io.sockets.in(lobbyName).emit('UPDATEGAMESTATE', {
      "currentSessions": getSessionNames(roomSession(lobbyName)),
      "game": updated_game["sessions"],
    });
    console.log("SUBMITANSWER: (" + socket.id + ') Sent answer to ' + lobbyName);
  });

})

server.listen(port, () => console.log(`Listening on port ${port}`))

function sessionConnectedDisconnected(socketID, connect) {
  //handles new connections and disconnects
  if (connect) {
    sessions.push({ id: socketID });
    console.log('CONNECT: Session ' + socketID + ' Connected');
  } else {
    const room = socketByID(socketID)["lobby"];

    //remove from sessions
    sessions = sessions.filter(x => x.id !== socketID);
    //removes from games
    const current_game = games.find(x => x.room == room);
    let updated_game = current_game;
    updated_game = {
      ...current_game,
      sessions: current_game["sessions"].filter(x => x.id == socketID),
    }
    games = games.map(x => x.room == room ? updated_game : x)

    //delete the room if there is nobody in it
    if (roomSession(room).length == 0) {
      rooms = rooms.filter(x => x !== room)
      //delete games with that room
      games = games.filter(x => x.room !== room)
    }
    console.log('DISCONNECT: Session ' + socketID + ' Disconnected');
  }
  printSessions();
  printRooms();
  printGames();
}

function printSessions() {
  //print all current sessions
  sessions_in_string = '['
  for (let i = 0; i < sessions.length; i++) {
    sessions_in_string += JSON.stringify(sessions[i]) + ', ';
  }
  sessions_in_string += ']';
  console.log('PRINT: Current sessions:' + sessions_in_string);
}


function printRooms() {
  //print all current Rooms
  rooms_in_string = '['
  for (let i = 0; i < rooms.length; i++) {
    rooms_in_string += rooms[i] + ', ';
  }
  rooms_in_string += ']';
  console.log('PRINT: Current Rooms:' + rooms_in_string);
}

function printGames() {
  //print all current games
  games_in_string = '['
  for (let i = 0; i < games.length; i++) {
    games_in_string += JSON.stringify(games[i]) + ', ';
  }
  games_in_string += ']';
  console.log('PRINT: Current Games:' + games_in_string);
}

//returns the session by socket id
function socketByID(id) {
  return sessions.find(x => x.id === id);
}

//returns all the sessions in a room
function roomSession(roomName) {
  return sessions.filter(x => x.lobby === roomName);
}

//formats sessions in a list of objects
function getSessionNames(session_array) {
  formatted = [];
  for (let i = 0; i < session_array.length; i++) {
    formatted.push({
      "id": session_array[i]["id"],
      "name": session_array[i]["name"],
      "ready": session_array[i]["ready"],
    });
  }
  return formatted;
}

//generate random room name of length n
function getRandomRoom(n) {
  let text = "";
  let possibble = possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

//checks if all sessions in a room are ready
function isRoomReady(roomname) {
  return roomSession(roomname).reduce((acc, curr) => acc && curr["ready"], true);
}

//Modifies the attribute to a value of all session in a room
function setSessionAttribute(room, attribute, attribute_value) {
  sessions = sessions.map(x => x["lobby"] == room ? { ...x, [attribute]: attribute_value } : x);
}

//gets a new trivia round
function getTrivia(optionsCount) {
  //gets new anime
  const total = animelist.length;
  const randAnime = Math.floor((Math.random() * total) + 1);
  const newAnime = animelist[randAnime];
  const newAnimeName = newAnime["source"];

  //gets random options
  let randomOptions = [];
  for (let i = 0; i < optionsCount; i++) {
    let index = Math.floor((Math.random() * total) + 1);
    let animeName = animelist[index]["source"];
    //prevents duplicates
    while (newAnimeName == animeName || randomOptions.includes(animeName)) {
      index = Math.floor((Math.random() * total) + 1);
      animeName = animelist[index]["source"];
    }
    randomOptions.push(animeName);
  }
  randomOptions[Math.floor((Math.random() * optionsCount))] = newAnimeName;

  data = {
    "animeName": newAnime["source"],
    "title": newAnime["title"],
    "songName": newAnime["song"] ? newAnime["song"]["title"] : null,
    "songArtist": newAnime["song"] ? newAnime["song"]["artist"] : null,
    "filename": "http://openings.moe/video/" + animelist[randAnime]["file"],
    "options": randomOptions,
  };

  return data;
}