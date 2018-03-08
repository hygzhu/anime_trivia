const game = function(previousState = {}, action) {
    switch (action.type) {
      case "CHANGEMODE":
        return { ...previousState,
                mode: action.mode,
                pointsMultiplier: previousState.choicesMultiplier * (action.mode === "visible" ? 1 : 2),
                modeMultiplier: (action.mode === "visible" ? 1 : 2)
            };
      case "CHANGECHOICES":
      return { ...previousState,
                choices: action.choices,
                pointsMultiplier: previousState.modeMultiplier  * (action.choices === 4 ? 1 : 2),
                choicesMultiplier: (action.choices === 4 ? 1 : 2)
            };
      case "PLAY":
        return previousState;
      default:
        return previousState;
    }
  }
  
  export default game;