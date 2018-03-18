//action to the server to create a lobby
export const createLobby = (name) => {
  return {
    type: "create-lobby",
    name: name,
    meta: {
      socket: {
        channel: 'create-lobby'
      },
    },
  }
}

//action to the server to join a lobby
export const joinLobby = (name, lobbyname) => {
  return {
    type: "join-lobby",
    name: name,
    lobbyname: lobbyname,
    meta: {
      socket: {
        channel: 'join-lobby'
      },
    },
  }
}

//action to the server to send a message in the lobby
export const sendMessage = (message) => {
  return {
    type: "send-message",
    message: message,
    meta: {
      socket: {
        channel: 'send-message'
      },
    },
  }
}

//action to the server that the player is ready
export const playerReady = () => {
  return {
    type: "player-ready",
    meta: {
      socket: {
        channel: 'player-ready'
      },
    },
  }
}

//action to the server to submit an answer
export const submitAnswer = (answer) => {
  return {
    type: "submit-answer",
    answer: answer,
    meta: {
      socket: {
        channel: 'submit-answer'
      },
    },
  }
}


export const nameChanged = (newName) => {
  return {
    type: "NAMECHANGED",
    name: newName
  }
}

export const lobbyNameChanged = (newName) => {
  return {
    type: "LOBBYNAMECHANGED",
    name: newName
  }
}

export const messageChanged = (newMessage) => {
  return {
    type: "MESSAGECHANGED",
    message: newMessage
  }
}