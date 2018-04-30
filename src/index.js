const initModel = require('./Model');
const { update } = require('./Update');
const view = require('./View');
const app = require('./App');
const EventEmitter = require('events');
const emitter = new EventEmitter();


app(initModel, update, view, emitter);
