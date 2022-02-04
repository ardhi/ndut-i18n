const path = require('path')

module.exports = async function (ndutConfig) {
  const { aneka, fastGlob } = this.ndut.helper
  const files = await fastGlob(`${ndutConfig.dir}/ndutI18N/language/*.{js,json}`)
  for (const f of files) {
    const lang = path.parse(f).name
    const mod = await aneka.requireBase.call(this, f)
    this.ndutI18N.instance.addResourceBundle(lang, ndutConfig.alias, mod, true, true)
  }
}
