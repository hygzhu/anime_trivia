const trivia = function(previousState = {}, action) {
    switch (action.type) {
      case "CHANGESONG":
        return { ...previousState,
          animeName: action.animeName,
          title: action.title,
          songName: action.songName,
          songArtist: action.songArtist,
          filename: action.filename
      };
      case "SUBMITANSWER":
        return { ...previousState,
          answer: action.answer
      };
      default:
        return previousState;
    }
  }
  
  export default trivia;