const game = function(previousState = {}, action) {
    switch (action.type) {
      case "PLAY":
        return { ...previousState,
          screen: "trivia",
          lives: 3,
          score: 0
      };
      case "SCORE":
        return { ...previousState,
          screen: "score"
      };
      case "MENU":
        return { ...previousState,
          screen: "menu"
      };
      case "SUBMITANSWER":
        return { ...previousState,
          score: previousState.score + action.score,
          lives: previousState.lives + action.lifeChange
        };
      default:
        return previousState;
    }
  }
  
  export default game;