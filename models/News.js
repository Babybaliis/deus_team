const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  name: { type: String, required: true },
  urlName: {type: String},
  image: { type: Object },
  mainNewsImage: { type: Object },
  photoSlider: { type: Array },
  body: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body2: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  workStepsItem: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  mainControl: {type: Boolean},
  detailControl: {type: Boolean},
  aboutClient: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  aboutClient2: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  newsTags: [{ type: Schema.Types.ObjectId, ref: 'NewsTags' }]
});

newsSchema.set('toJSON', { virtuals: true });
newsSchema.set('toObject', { virtuals: true });
newsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('News', newsSchema);