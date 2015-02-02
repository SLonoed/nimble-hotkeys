help = null
module.exports = (event) ->
  event.preventDefault()

  help = new Help() unless help

  help.toggle()


class Help
  zIndex: 10000

  constructor: ->
    container = @buildContainer()
    container.click () -> false
    container.find('.' + @cname 'close').click => @toggle()

    @wrapper = @buildWrapper()
    @wrapper.append container
    @wrapper.click => @toggle()

    $('body').append @wrapper

  toggle: ->
    @wrapper.toggleClass @cname 'wrapper-visible'


  buildWrapper: ->
    $('<div/>').addClass @cname 'wrapper'


  buildContainer: ->
    $('<div/>')
      .addClass @cname 'container'
      .html @buildHelp()


  buildHelp: ->
    # use classes to prevent page css overwrite

    header = @cname 'header'
    close = @cname 'close'
    content = @cname 'content'

    html = """
      <div class='#{header}'>
        <h2>
          Hotkeys (Taist)
          <a class='#{close}'>Close</a>
        </h2>
      </div>
      <div class='#{content}'>
        <h3>Deal page</h3>
        <ul>
          <li>
            <b>c</b> Create deal
          </li>
          <li>
            <b>e</b> Edit deal
          </li>
        </ul>
        <h3>Contacts page</h3>
        <ul>
          <li>
            <b>c</b> Create contact
          </li>
          <li>
            <b>shift + c</b> Create campaign
          </li>
          <li>
            <b>e</b> Edit contact
          </li>
        </ul>
      </div>
    """

    help = $ html
    help.find('ul').addClass 'taist-nimble-hotkeys-help-list'
    help.find('li').addClass 'taist-nimble-hotkeys-help-li'
    help.find('li b').addClass 'taist-nimble-hotkeys-help-key'

    return help

  cname: (elementName) -> "taist-nimble-hotkeys-help-#{elementName}"
