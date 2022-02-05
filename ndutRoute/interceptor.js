const onRequest = require('../lib/handle-on-request')

module.exports = async function (options) {
  this.addHook('onRequest', async function (request, reply) {
    await onRequest.call(this, request, reply, true)
  })
}
