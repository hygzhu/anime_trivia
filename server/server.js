const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

var sessions = []
var total_rooms = 0;

io.on('connection', socket => {

  //connect message
  sessionConnectedDisconnected(socket.id, true)

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    sessionConnectedDisconnected(socket.id, false)
  })

  //Create a new game lobby
  socket.on('create-lobby', (data) => {
    //data has schema
    /**
     * type, newUser, payload (message), meta
     */
    const lobbyName= 'test_room'
    console.log(data);
    socket.join(lobbyName);
    console.log( socket.id +' Joined Lobby: ');
    console.log(io.sockets.adapter.rooms[lobbyName]);

    //sends room info
    io.sockets.in(lobbyName).emit('LOADROOM', {
      "currentSessions": Object.keys(io.sockets.adapter.rooms[lobbyName]['sockets']),
      "lobbyName": lobbyName,
      "active": true
    });
  });
})

server.listen(port, () => console.log(`Listening on port ${port}`))

function sessionConnectedDisconnected(socketID, connect){
  if(connect){
    sessions.push(socketID);
    console.log('Session '+  socketID +' Connected\nCurrent sessions:');
  }else{
    sessions = sessions.filter(x => x !== socketID);
    console.log('Session '+  socketID +' Disconnected\nCurrent sessions: ');
  }
  //print all current sessions
  sessions_in_string = '['
  for(var i = 0; i < sessions.length; i++){
    sessions_in_string +=  sessions[i] + ', ';
  }
  sessions_in_string += ']';
  console.log(sessions_in_string);
}