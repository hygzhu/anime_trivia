export const changeSong = (animeName, title, songName, songArtist, filename) => {
  return {
    type: "CHANGESONG",
    animeName: animeName,
    title: title,
    songName: songName,
    songArtist: songArtist,
    filename: filename
  }
}

export const submitAnswer  = (answer, score, lifeChange) => {
  return {
    type: "SUBMITANSWER",
    answer: answer,
    score: score,
    lifeChange: lifeChange
  }
}