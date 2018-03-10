const score = function(previousState = {}, action) {
    switch (action.type) {
      case "GETHIGHSCORES":
        return { ...previousState,
          highscores: action.highscores,
          beatenScoreID: action.beatenScoreID,
          isHighscore: action.isHighscore,
      };
      case "CHANGENAME":
        return { ...previousState,
          name: action.name
      };
      case "SUBMITSCORE":
        return { ...previousState,
          scoreSubmitted: true
      };
      case "PLAY":
        return { ...previousState,
          scoreSubmitted: false
      };
      default:
        return previousState;
    }
  }
  
  export default score;