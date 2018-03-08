const menu = function(previousState = {}, action) {
    switch (action.type) {
      case "CHANGEMODE":
        return { ...previousState,
                mode: action.mode,
            };
      case "CHANGECHOICES":
      return { ...previousState,
        choices: action.choices,
            };
      case "PLAY":
        return previousState;
      default:
        return previousState;
    }
  }
  
  export default menu;