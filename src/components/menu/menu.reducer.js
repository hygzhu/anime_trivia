const menu = function(previousState = {}, action) {
    switch (action.type) {
      case "CHANGEMODE":
        return { ...previousState,
                mode: action.mode,
            };
      case "CHANGECHOICES":
        return previousState;
      case "PLAY":
        return previousState;
      default:
        return previousState;
    }
  }
  
  export default menu;