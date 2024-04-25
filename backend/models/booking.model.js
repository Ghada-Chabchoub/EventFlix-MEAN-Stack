const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seat_type: {
    type: String,
    enum: ['vip', 'normal'],
    required: true,
  },
  seat_price: {
    type: Number,
    enum: [ 20 , 10 ],
    required: true,
  },
  ticket_numbers: {
    type: Number,
    required: true,
  },
  food_options: {
    type: [String],
    enum: ['popcorn', 'jus', 'eau'],
  },
  total_cost: {
    type: Number,
    required: true,
  },
  num_carte: {
    type: String,
    required: true,
  },
  code_carte: { 
    type: String,
    required: true,
  },
});

bookingSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;