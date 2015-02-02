#jslint browser: true*/
#jslint jquery: true*/

#
# jQuery Hotkeys Plugin
# Copyright 2010, John Resig
# Dual licensed under the MIT or GPL Version 2 licenses.
#
# Based upon the plugin by Tzury Bar Yochay:
# http://github.com/tzuryby/hotkeys
#
# Original idea by:
# Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
#/

#
# One small change is: now keys are passed by object { keys: '...' }
# Might be useful, when you want to pass some other data to your handler
#/
module.exports = ((jQuery) ->
  keyHandler = (handleObj) ->
    if typeof handleObj.data == 'string'
      handleObj.data =
        keys: handleObj.data
    # Only care when a possible input has been specified
    if !handleObj.data or !handleObj.data.keys or typeof handleObj.data.keys != 'string'
      return
    origHandler = handleObj.handler
    keys = handleObj.data.keys.toLowerCase().split(' ')

    handleObj.handler = (event) ->
      #      Don't fire in text-accepting inputs that we didn't directly bind to
      if this != event.target and (jQuery.hotkeys.options.filterInputAcceptingElements and jQuery.hotkeys.textInputTypes.test(event.target.nodeName) or jQuery.hotkeys.options.filterContentEditable and jQuery(event.target).attr('contenteditable') or jQuery.hotkeys.options.filterTextInputs and jQuery.inArray(event.target.type,
        jQuery.hotkeys.textAcceptingInputTypes) > -1)
        return
      special = event.type != 'keypress' and jQuery.hotkeys.specialKeys[event.which]
      character = String.fromCharCode(event.which).toLowerCase()
      modif = ''
      possible = {}
      jQuery.each [
        'alt'
        'ctrl'
        'shift'
      ], (index, specialKey) ->
        if event[specialKey + 'Key'] and special != specialKey
          modif += specialKey + '+'
        return
      # metaKey is triggered off ctrlKey erronously
      if event.metaKey and !event.ctrlKey and special != 'meta'
        modif += 'meta+'
      if event.metaKey and special != 'meta' and modif.indexOf('alt+ctrl+shift+') > -1
        modif = modif.replace('alt+ctrl+shift+', 'hyper+')
      if special
        possible[modif + special] = true
      else
        possible[modif + character] = true
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true
        # "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if modif == 'shift+'
          possible[jQuery.hotkeys.shiftNums[character]] = true
      i = 0
      l = keys.length
      while i < l
        if possible[keys[i]]
          return origHandler.apply(this, arguments)
        i++
      return

    return

  jQuery.hotkeys =
    version: '0.8'
    specialKeys:
      8: 'backspace'
      9: 'tab'
      10: 'return'
      13: 'return'
      16: 'shift'
      17: 'ctrl'
      18: 'alt'
      19: 'pause'
      20: 'capslock'
      27: 'esc'
      32: 'space'
      33: 'pageup'
      34: 'pagedown'
      35: 'end'
      36: 'home'
      37: 'left'
      38: 'up'
      39: 'right'
      40: 'down'
      45: 'insert'
      46: 'del'
      59: ';'
      61: '='
      96: '0'
      97: '1'
      98: '2'
      99: '3'
      100: '4'
      101: '5'
      102: '6'
      103: '7'
      104: '8'
      105: '9'
      106: '*'
      107: '+'
      109: '-'
      110: '.'
      111: '/'
      112: 'f1'
      113: 'f2'
      114: 'f3'
      115: 'f4'
      116: 'f5'
      117: 'f6'
      118: 'f7'
      119: 'f8'
      120: 'f9'
      121: 'f10'
      122: 'f11'
      123: 'f12'
      144: 'numlock'
      145: 'scroll'
      173: '-'
      186: ';'
      187: '='
      188: ','
      189: '-'
      190: '.'
      191: '/'
      192: '`'
      219: '['
      220: '\\'
      221: ']'
      222: '\''
    shiftNums:
      '`': '~'
      '1': '!'
      '2': '@'
      '3': '#'
      '4': '$'
      '5': '%'
      '6': '^'
      '7': '&'
      '8': '*'
      '9': '('
      '0': ')'
      '-': '_'
      '=': '+'
      ';': ': '
      '\'': '"'
      ',': '<'
      '.': '>'
      '/': '?'
      '\\': '|'
    textAcceptingInputTypes: [
      'text'
      'password'
      'number'
      'email'
      'url'
      'range'
      'date'
      'month'
      'week'
      'time'
      'datetime'
      'datetime-local'
      'search'
      'color'
      'tel'
    ]
    textInputTypes: /textarea|input|select/i
    options:
      filterInputAcceptingElements: true
      filterTextInputs: true
      filterContentEditable: true

  jQuery.each [
    'keydown'
    'keyup'
    'keypress'
  ], ->
    jQuery.event.special[this] =
      add: keyHandler
    return
  return)

