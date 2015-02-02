function init(){var require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*
  Open add person modal
 */
module.exports = function(event) {
  var btn;
  btn = $('.nmbl-Button-addCompany input');
  console.log(btn);
  if (btn.length) {
    btn.click();
    return event.preventDefault();
  }
};

},{}],2:[function(require,module,exports){

/*
  Open add person modal
 */
module.exports = function(event) {
  var btn;
  btn = $('.nmbl-Button-addContact input');
  if (btn.length) {
    btn.click();
    return event.preventDefault();
  }
};

},{}],3:[function(require,module,exports){

/*
  Go to contact deal page
 */
module.exports = function(event) {
  var btn;
  btn = $('.ContactView .nmbl-Button-editAction input');
  if (btn.length) {
    btn.click();
    return event.preventDefault();
  }
};

},{}],4:[function(require,module,exports){

/*
  Open new deal modal
 */
module.exports = function(event) {
  var btn;
  btn = $('.nmbl-Button-newDeal input');
  if (btn.length) {
    btn.click();
    return event.preventDefault();
  }
};

},{}],5:[function(require,module,exports){

/*
  Go to edit deal page
 */
module.exports = function(event) {
  var btn;
  btn = $('.DealView .nmbl-Button-editAction input');
  if (btn.length) {
    btn.click();
    return event.preventDefault();
  }
};

},{}],6:[function(require,module,exports){
var Help, help;

help = null;

module.exports = function(event) {
  event.preventDefault();
  if (!help) {
    help = new Help();
  }
  return help.toggle();
};

Help = (function() {
  Help.prototype.zIndex = 10000;

  function Help() {
    var container;
    container = this.buildContainer();
    container.click(function() {
      return false;
    });
    container.find('.' + this.cname('close')).click((function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
    this.wrapper = this.buildWrapper();
    this.wrapper.append(container);
    this.wrapper.click((function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
    $('body').append(this.wrapper);
  }

  Help.prototype.toggle = function() {
    return this.wrapper.toggleClass(this.cname('wrapper-visible'));
  };

  Help.prototype.buildWrapper = function() {
    return $('<div/>').addClass(this.cname('wrapper'));
  };

  Help.prototype.buildContainer = function() {
    return $('<div/>').addClass(this.cname('container')).html(this.buildHelp());
  };

  Help.prototype.buildHelp = function() {
    var close, content, header, html;
    header = this.cname('header');
    close = this.cname('close');
    content = this.cname('content');
    html = "<div class='" + header + "'>\n  <h2>\n    Hotkeys (Taist)\n    <a class='" + close + "'>Close</a>\n  </h2>\n</div>\n<div class='" + content + "'>\n  <h3>Deal page</h3>\n  <ul>\n    <li>\n      <b>c</b> Create deal\n    </li>\n    <li>\n      <b>e</b> Edit deal\n    </li>\n  </ul>\n  <h3>Contacts page</h3>\n  <ul>\n    <li>\n      <b>c</b> Create contact\n    </li>\n    <li>\n      <b>shift + c</b> Create campaign\n    </li>\n    <li>\n      <b>e</b> Edit contact\n    </li>\n  </ul>\n</div>";
    help = $(html);
    help.find('ul').addClass('taist-nimble-hotkeys-help-list');
    help.find('li').addClass('taist-nimble-hotkeys-help-li');
    help.find('li b').addClass('taist-nimble-hotkeys-help-key');
    return help;
  };

  Help.prototype.cname = function(elementName) {
    return "taist-nimble-hotkeys-help-" + elementName;
  };

  return Help;

})();

},{}],7:[function(require,module,exports){
module.exports = (function(jQuery) {
  var keyHandler;
  keyHandler = function(handleObj) {
    var keys, origHandler;
    if (typeof handleObj.data === 'string') {
      handleObj.data = {
        keys: handleObj.data
      };
    }
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== 'string') {
      return;
    }
    origHandler = handleObj.handler;
    keys = handleObj.data.keys.toLowerCase().split(' ');
    handleObj.handler = function(event) {
      var character, i, l, modif, possible, special;
      if (this !== event.target && (jQuery.hotkeys.options.filterInputAcceptingElements && jQuery.hotkeys.textInputTypes.test(event.target.nodeName) || jQuery.hotkeys.options.filterContentEditable && jQuery(event.target).attr('contenteditable') || jQuery.hotkeys.options.filterTextInputs && jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1)) {
        return;
      }
      special = event.type !== 'keypress' && jQuery.hotkeys.specialKeys[event.which];
      character = String.fromCharCode(event.which).toLowerCase();
      modif = '';
      possible = {};
      jQuery.each(['alt', 'ctrl', 'shift'], function(index, specialKey) {
        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });
      if (event.metaKey && !event.ctrlKey && special !== 'meta') {
        modif += 'meta+';
      }
      if (event.metaKey && special !== 'meta' && modif.indexOf('alt+ctrl+shift+') > -1) {
        modif = modif.replace('alt+ctrl+shift+', 'hyper+');
      }
      if (special) {
        possible[modif + special] = true;
      } else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
        if (modif === 'shift+') {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }
      i = 0;
      l = keys.length;
      while (i < l) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
        i++;
      }
    };
  };
  jQuery.hotkeys = {
    version: '0.8',
    specialKeys: {
      8: 'backspace',
      9: 'tab',
      10: 'return',
      13: 'return',
      16: 'shift',
      17: 'ctrl',
      18: 'alt',
      19: 'pause',
      20: 'capslock',
      27: 'esc',
      32: 'space',
      33: 'pageup',
      34: 'pagedown',
      35: 'end',
      36: 'home',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      45: 'insert',
      46: 'del',
      59: ';',
      61: '=',
      96: '0',
      97: '1',
      98: '2',
      99: '3',
      100: '4',
      101: '5',
      102: '6',
      103: '7',
      104: '8',
      105: '9',
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      112: 'f1',
      113: 'f2',
      114: 'f3',
      115: 'f4',
      116: 'f5',
      117: 'f6',
      118: 'f7',
      119: 'f8',
      120: 'f9',
      121: 'f10',
      122: 'f11',
      123: 'f12',
      144: 'numlock',
      145: 'scroll',
      173: '-',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    },
    shiftNums: {
      '`': '~',
      '1': '!',
      '2': '@',
      '3': '#',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '&',
      '8': '*',
      '9': '(',
      '0': ')',
      '-': '_',
      '=': '+',
      ';': ': ',
      '\'': '"',
      ',': '<',
      '.': '>',
      '/': '?',
      '\\': '|'
    },
    textAcceptingInputTypes: ['text', 'password', 'number', 'email', 'url', 'range', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'search', 'color', 'tel'],
    textInputTypes: /textarea|input|select/i,
    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  };
  jQuery.each(['keydown', 'keyup', 'keypress'], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });
});

},{}],"addon":[function(require,module,exports){
var entryPoint, handlers, hotkeysInit;

hotkeysInit = require('./jquery-hotkeys');

handlers = {
  'c': [require('./handlers/deal-create'), require('./handlers/contact-create')],
  'shift+c': [require('./handlers/contact-company-create')],
  'e': [require('./handlers/deal-edit'), require('./handlers/contact-edit')],
  'shift+?': [require('./handlers/help-show')]
};

module.exports = entryPoint = {
  start: function(_taistApi) {
    hotkeysInit($);
    return Object.keys(handlers).forEach(function(key) {
      return handlers[key].forEach(function(handler) {
        return $(document).on('keypress', null, key, handler);
      });
    });
  }
};

},{"./handlers/contact-company-create":1,"./handlers/contact-create":2,"./handlers/contact-edit":3,"./handlers/deal-create":4,"./handlers/deal-edit":5,"./handlers/help-show":6,"./jquery-hotkeys":7}]},{},[]);
;return require("addon")}