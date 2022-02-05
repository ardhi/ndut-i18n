module.exports = async function (request, reply, withSession) {
  const { getNdutConfig } = this.ndut.helper
  const { getUrl } = this.ndutRoute.helper
  const cfg = getNdutConfig('ndut-i18n')
  let lang = cfg.lang === 'detect' ? null : cfg.lang
  if (!lang && cfg.detectFromParams) lang = request.params.lang
  if (!lang && cfg.detectFromQsKey && request.query[cfg.detectFromQsKey]) lang = request.query[cfg.detectFromQsKey]
  // TODO: check accept-language
  if (withSession && !lang && request.session && request.session.lang) lang = request.session.lang
  if (!lang) lang = cfg.fallbackLang
  if (!cfg.supportedLangs.includes(lang)) {
    if (cfg.lang === 'detect' && cfg.detectFromParams) {
      reply.redirect(getUrl(request.routerPath, false, { lang: cfg.fallbackLang }))
      return
    }
    lang = cfg.fallbackLang
  }

  if (withSession && request.session) request.session.lang = lang
  reply.header('Content-Language', lang)
  const i18n = this.ndutI18N.instance.cloneInstance({ initImmediate: false })
  if (lang !== i18n.language) await i18n.changeLanguage(lang)
  request.lang = lang
  request.i18n = i18n
}
