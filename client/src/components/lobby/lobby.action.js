export const userJoined = (name) => {
    return {
      type: "USERJOINED",
      newUser: name,
      payload: {
        message: 'I joined the room',
      },
      meta: {
        socket: {
          channel: 'create-lobby'
        },
      },
    }
  }
