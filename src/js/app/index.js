require('less/index.less')
var $ = require('../lib/jquery-3.2.0.min.js')

var NoteManager = require('../mod/note-manager.js').NoteManager;
var Event = require('../mod/event.js').EventCenter;
var waterRender = require('../mod/waterfull.js').waterRender;

NoteManager.load();

$('.add-note').on('click', function() {
    NoteManager.add();
})

Event.on('waterRender', function() {
    new waterRender($('.wrap'))
})