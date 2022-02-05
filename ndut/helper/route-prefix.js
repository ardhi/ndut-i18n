module.exports = function () {
  const { getNdutConfig } = this.ndut.helper
  const cfg = getNdutConfig('ndut-i18n')
  if (!cfg) return ''
  return cfg.lang === 'detect' && cfg.detectFromParams ? '/:lang' : ''
}
