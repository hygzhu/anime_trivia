const port = 4001
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
  'userJoined',
  'userLeft',
  'joinRequested',
  'usersRequested',
  'userStartedTyping',
  'userStoppedTyping',
  'messageAdded',
  'userRefreshed'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})

module.exports = {
  port,
  host,
  messageTypes,
  uri: `http://${host}:${port}`
}
