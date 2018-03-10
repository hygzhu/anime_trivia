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

export const submitScore = (points) => {
  return {
    type: "SUBMITSCORE",
    points: points
  }
}

export const submitAnswer  = (answer) => {
  return {
    type: "SUBMITANSWER",
    answer: answer
  }
}