const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workingSchema = new Schema({
  name: { type: String, required: true, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  descr: { type: String, required: true, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  file: { type: Object },
});

workingSchema.set('toJSON', { virtuals: true });
workingSchema.set('toObject', { virtuals: true });
workingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Working', workingSchema);