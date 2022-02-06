const onRequest = require('../../lib/handle-on-request')

module.exports = {
  level: 10,
  handler: async function (request, reply) {
    await onRequest.call(this, request, reply)
  }
}
