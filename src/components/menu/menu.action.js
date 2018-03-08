export const changeMode = (mode) => {
    return {
      type: "CHANGEMODE",
      mode: mode
    }
  }
  
  export const changeChoices = (choices) => {
    return {
      type: "CHANGECHOICES",
      choices: choices
    }
  }
  
  export const play = () => {
    return {
      type: "PLAY",
    }
  }
  