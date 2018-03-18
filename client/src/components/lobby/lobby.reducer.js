const lobby = function(previousState = {}, action) {
    switch (action.type) {
      case "LOADROOM":
        return { ...previousState,
          sessions: action.payload.currentSessions,
          lobbyname: action.payload.lobbyName,
          active: action.payload.active,
          loading: false,
          sessionID: action.payload.sessionID,
          roomReady: action.payload.roomReady,
            };
      case "USERJOINED":
        return { ...previousState,
          sessions: action.payload.currentSessions,
          roomReady: action.payload.roomReady,
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
      case "MESSAGECHANGED":
        return { ...previousState,
          message: action.message,
          };
      case "MESSAGERECEIVED":
        return { ...previousState,
          messageLog: previousState.messageLog.concat(action.payload.message),
          };
      case "ROOMREADY":
        return { ...previousState,
          ready: action.payload.currentSessions.find(
            x => x.id == previousState.sessionID).ready,
          sessions: action.payload.currentSessions,
          roomReady: action.payload.roomReady,
          };
      case "ROUNDSTART":
        return { ...previousState,
          trivia: action.payload.trivia,
          sessions: action.payload.currentSessions,
          roomReady: action.payload.roomReady,
          gameActive: action.payload.gameActive,
          ready: action.payload.ready,
          game: action.payload.game,
          };
      case "UPDATEGAMESTATE":
        return { ...previousState,
          sessions: action.payload.currentSessions,
          game: action.payload.game,
          };
      case "create-lobby":
        return { ...previousState,
          loading: true,
            };
      case "join-lobby":
        return { ...previousState,
          loading: true,
            };
      case "submit-answer":
        return { ...previousState,
          ready: false,
            };
      default:
        return previousState;
    }
  }
  
  export default lobby;