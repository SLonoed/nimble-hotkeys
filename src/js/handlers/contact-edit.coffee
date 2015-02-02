###
  Go to contact deal page
###
module.exports = (event) ->
  btn = $ '.ContactView .nmbl-Button-editAction input'

  if btn.length
    btn.click();
    event.preventDefault()
