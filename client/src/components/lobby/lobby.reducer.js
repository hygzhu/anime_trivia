const lobby = function(previousState = {}, action) {
    switch (action.type) {
      case "LOADROOM":
        return { ...previousState,
          sessions: action.payload.currentSessions,
          lobbyname: action.payload.lobbyName,
          active: action.payload.active,
          loading: false,
          sessionID: action.payload.sessionID,
            };
      case "USERJOINED":
        return { ...previousState,
          sessions: action.payload.currentSessions,
            };
      case "USERDISCONNECT":
        return { ...previousState,
          sessions: action.payload.currentSessions,
            };
      case "JOINROOMFAILED":
        return { ...previousState,
          loading: false,
          active: false,
            };
      case "NAMECHANGED":
        return { ...previousState,
          name: action.name,
            };
      case "LOBBYNAMECHANGED":
        return { ...previousState,
          lobbyname: action.name,
            };
      case "create-lobby":
        return { ...previousState,
          loading: true,
            };
      case "join-lobby":
        return { ...previousState,
          loading: true,
            };
      default:
        return previousState;
    }
  }
  
  export default lobby;