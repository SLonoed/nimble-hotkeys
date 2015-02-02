###
  Open new deal modal
###
module.exports = (event) ->
  btn = $ '.nmbl-Button-newDeal input'

  if btn.length
    btn.click();
    event.preventDefault()
