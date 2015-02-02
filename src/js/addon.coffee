hotkeysInit = require './jquery-hotkeys'

handlers = {
  'c': [
    require('./handlers/deal-create')
    require('./handlers/contact-create')
  ]

  'shift+c': [
    require('./handlers/contact-company-create')
  ]

  'e': [
    require('./handlers/deal-edit')
    require('./handlers/contact-edit')
  ]

  'shift+?': [
    require('./handlers/help-show')
  ]
}

module.exports = entryPoint =
  start: (_taistApi) ->
    hotkeysInit($)

    Object.keys(handlers).forEach (key) ->
      handlers[key].forEach (handler) ->
        $(document).on 'keypress', null, key, handler

