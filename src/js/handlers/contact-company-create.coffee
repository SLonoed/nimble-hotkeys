###
  Open add person modal
###
module.exports = (event) ->
  btn = $ '.nmbl-Button-addCompany input'

  console.log(btn)
  if btn.length
    btn.click();
    event.preventDefault()
