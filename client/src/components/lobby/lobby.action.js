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
