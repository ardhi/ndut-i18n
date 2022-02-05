const path = require('path')

module.exports = async function (ndutConfig) {
  const { _, aneka, fastGlob, getConfig } = this.ndut.helper
  const { requireBase } = aneka
  const config = getConfig()
  const files = await fastGlob(`${ndutConfig.dir}/ndutI18N/language/*.{js,json}`)
  for (const f of files) {
    const lang = path.parse(f).name
    let override
    try {
      override = await requireBase(`${config.dir.base}/ndutI18N/language/override/${ndutConfig.alias}/${lang}.json`, this)
    } catch (err) {}
    if (override) {
      this.ndutI18N.instance.addResourceBundle(lang, ndutConfig.alias, override, true, true)
      continue
    }
    let extend
    try {
      extend = await requireBase(`${config.dir.base}/ndutI18N/language/extend/${ndutConfig.alias}/${lang}.json`, this)
    } catch (err) {}
    const mod = _.merge(await aneka.requireBase(f, this), extend)
    this.ndutI18N.instance.addResourceBundle(lang, ndutConfig.alias, mod, true, true)
  }
}
