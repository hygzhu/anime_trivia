const game = function(previousState = {}, action) {
    switch (action.type) {
      case "PLAY":
        return { ...previousState,
          screen: "trivia"
      };
      case "SUBMITSCORE":
      return { ...previousState,
        score: previousState.score + action.points,
      };
      default:
        return previousState;
    }
  }
  
  export default game;