module.exports = async function (request, reply) {
  const { getNdutConfig } = this.ndut.helper
  const cfg = getNdutConfig('ndut-i18n')
  let lang = cfg.lang === 'detect' ? null : cfg.lang
  // TODO: get from request.params
  if (!lang && cfg.detectFromQsKey && request.query[cfg.detectFromQsKey]) lang = request.query[cfg.detectFromQsKey]
  // TODO: check accept-language
  if (!lang && request.session && request.session.lang) lang = request.session.lang
  if (!lang) lang = cfg.fallbackLang
  if (!cfg.supportedLangs.includes(lang)) lang = cfg.fallbackLang
  if (request.session) request.session.lang = lang
  reply.header('Content-Language', lang)
  const i18n = this.ndutI18N.instance.cloneInstance({ initImmediate: false })
  if (lang !== i18n.language) await i18n.changeLanguage(lang)
  request.lang = lang
  request.i18n = i18n
}
