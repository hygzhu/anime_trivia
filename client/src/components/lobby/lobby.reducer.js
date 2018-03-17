const lobby = function(previousState = {}, action) {
    switch (action.type) {
      case "USERJOINED":
        return { ...previousState,
            };
      case "LOADROOM":
        return { ...previousState,
          sessions: action.payload.currentSessions,
          lobbyname: action.payload.lobbyName,
          active: action.payload.active
            };
      default:
        return previousState;
    }
  }
  
  export default lobby;