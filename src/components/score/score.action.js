export const getHighscores = (highscores, isHighscore, beatenScoreID) => {
    return {
      type: "GETHIGHSCORES",
      highscores: highscores,
      isHighscore: isHighscore,
      beatenScoreID: beatenScoreID
    }
  }
  
  export const changeName = (name) => {
    return {
      type: "CHANGENAME",
      name: name
    }
  }
  
  export const submitScore = () => {
    return {
      type: "SUBMITSCORE",
    }
  }