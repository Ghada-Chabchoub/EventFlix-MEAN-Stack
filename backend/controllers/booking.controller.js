const db = require("../models");
const Booking = db.bookings;
const mongoose = require('mongoose'); 

// Create and Save a new booking 
exports.create = (req, res) => {
  if (!req.body.event_id || !req.body.user_id) {
    res.status(400).send({ message: "Both event_id and user_id are required!" });
    return;
}

    console.log("event_id:", req.body.event_id);
    console.log("user_id:", req.body.user_id);
    // Create a booking
    try{

   
    const booking = new Booking({
      event_id: mongoose.Types.ObjectId(req.body.event_id),
      user_id: mongoose.Types.ObjectId(req.body.user_id),
      seat_type: req.body.seat_type,
      seat_price: req.body.seat_price,
      ticket_numbers: req.body.ticket_numbers,
      food_options: req.body.food_options,
      total_cost: req.body.total_cost,
      num_carte: req.body.num_carte,
      code_carte: req.body.code_carte,
  });
    // Save booking in the database
    booking.save(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the booking."
      });
    });  
     } catch (error) {
      res.status(400).send({ message: "Invalid event_id or user_id format." });
  }
}; 

// Retrieve all booking from the database. 
exports.findAll = (req, res) => {
  const booking_id = req.query.booking_id;
  var condition = booking_id ? { booking_id: { $regex: new RegExp(booking_id), $options: "i" } } : {};

  Booking.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    });
};

// Find a single booking with an id 
exports.findOne = (req, res) => {
  const id = req.params.booking_id;

  Booking.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found booking  with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500)
        .send({ message: "Error retrieving booking with id=" + id });
    });
};

// Update a booking by the id in the request 
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Booking.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update booking with id=${id}. Maybe booking was not found!`
        });
      } else res.send({ message: "booking was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating booking with id=" + id
      });
    });
};

// Delete a booking with the specified id in the request 
exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete booking with id=${id}. Maybe booking was not found!`
        });
      } else {
        res.send({
          message: "booking was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all booking from the database. 
exports.deleteAll = (req, res) => {
  Booking.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} booking were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all booking."
      });
    });
};

// Find all published booking   
exports.findAllPublished = (req, res) => {
  Booking.find({ event_status:"approved" }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    });
};