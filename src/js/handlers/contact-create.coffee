###
  Open add person modal
###
module.exports = (event) ->
  btn = $ '.nmbl-Button-addContact input'

  if btn.length
    btn.click();
    event.preventDefault()
