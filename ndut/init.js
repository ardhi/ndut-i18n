const i18next = require('i18next')
const loadHandler = require('../lib/load-handler')

module.exports = async function (options) {
  const { _, getConfig, iterateNduts } = this.ndut.helper
  const config = getConfig()
  const allAliases = Object.keys(await iterateNduts(() => {}, { resultKey: 'alias' }))
  if (options.lang !== 'detect') options.detectFromParams = false
  const opts = {
    debug: config.debug,
    fallbackLng: options.fallbackLang,
    // supportedLngs: ['en-US'],  // doesn't work .. ?!
    nonExplicitSupportedLngs: true,
    ns: allAliases,
    defaultNS: 'i18n'
  }
  if (options.lang !== 'detect') opts.lng = options.lang
  await i18next.init(opts)
  const exported = {}
  _.each(['t', 'exists', 'getFixedT', 'changeLanguage'], m => {
    exported[m] = i18next[m]
  })
  this.ndutI18N.instance = i18next
  await iterateNduts(loadHandler)
  let helper = this.ndutI18N.helper
  helper = _.extend(helper, exported)
}
