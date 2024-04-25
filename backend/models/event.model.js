const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
    unique: true,
  },
  moderator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', 
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  event_artist: {
    type: String,
    required: true,
  },
  event_duration: {
    type: Number,
    required: true,
  },
  event_start: {
    type: String,
    required: true,
  },
  event_end: {
    type: String,
    required: true,
  },

  event_location: {
    type: String,
    required: true,
  },

  event_category: {
    type: String,
    required: true,
  },
  event_rating: {
    type: Number,
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  event_picture: {
    type: String,
    required: true,
  },
  event_status: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    default: 'pending',
  },
});
eventSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

eventSchema.statics.deleteByEventName = function (eventName, callback) {
  return this.deleteOne({ event_name: eventName }, callback);
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;