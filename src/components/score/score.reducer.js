const score = function(previousState = {}, action) {
    switch (action.type) {
      case "PLAY":
        return { ...previousState,
          screen: "trivia"
      };
      default:
        return previousState;
    }
  }
  
  export default score;