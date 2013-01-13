var sp = require("sdk/simple-prefs");
var uuid = require('sdk/util/uuid').uuid;
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

// XXX move these to another file?
var MIN_PASSLEN = 2;
var MAX_PASSLEN = 26;

// passwordLength bounds
sp.on('passwordLength', function () {
  var len = parseInt(sp.prefs.passwordLength, 10);
  if (len < MIN_PASSLEN)
    sp.prefs.passwordLength = MIN_PASSLEN;
  else if (len > MAX_PASSLEN)
    sp.prefs.passwordLength = MAX_PASSLEN;
});

// make sure master key is not empty
if (!sp.prefs.masterKey) {
  var ustr = uuid() + '';
  sp.prefs.masterKey = ustr.substr(1, 36);
}

// create widget and panel popup
require("widget").Widget({
  label: "Password Hasher",
  id: "hasher-panel",
  contentURL: "http://www.mozilla.org/favicon.ico", // TODO we need a local png
  panel: require("panel").Panel({
    width: 320,
    height: 120,
    contentURL: data.url("panel/index.html"),
    contentScriptFile: [
      data.url("panel/index.js")
    ]
  })
});

// inject this content script
pageMod.PageMod({
  include: "*",
  contentScriptFile: [
    data.url("lib/jquery-1.8.3.min.js"),
    data.url("field_spy.js")
  ],
  onAttach: function(worker) {
    // worker.tab gives use the browser
  }
});