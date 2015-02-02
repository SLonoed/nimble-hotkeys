###
  Go to edit deal page
###
module.exports = (event) ->
  btn = $ '.DealView .nmbl-Button-editAction input'

  if btn.length
    btn.click();
    event.preventDefault()
