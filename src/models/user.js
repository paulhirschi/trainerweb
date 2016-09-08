var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  date: {type: Date, default: Date.now} 
});

module.exports = mongoose.model('User', UserSchema);
