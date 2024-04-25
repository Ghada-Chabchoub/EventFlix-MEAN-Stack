const db = require("../models");
const Event = db.events;

// Create and Save a new event ******* success *********
exports.create = (req, res) => {
    // Validate request
    if (req.body.event) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    // Create an event
    const event = new Event({
      event_id: req.body.event_id,
      moderator_id: req.body.moderator_id,
      event_name: req.body.event_name,
      event_artist: req.body.event_artist,
      event_duration: req.body.event_duration,
      event_start: req.body.event_start,
      event_end: req.body.event_end,
      event_location: req.body.event_location,
      event_category: req.body.event_category,
      event_rating: req.body.event_rating, 
      event_description: req.body.event_description,
      event_picture: req.body.event_picture,
      event_status: req.body.event_status
  });
    // Save event in the database
    event
    .save(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });

  
}; 

// Retrieve all events from the database. ******* success *********
exports.findAll = (req, res) => {
  const event_name = req.query.event_name;
  var condition = event_name ? { event_name: { $regex: new RegExp(event_name), $options: "i" } } : {};

  Event.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

// Find a single event with an id ******* success *********
/*
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Event with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500)
        .send({ message: "Error retrieving Event with id=" + id });
    });
};
*/
// Find a single event with an title ******* success *********


exports.findByEventName = async (req, res) => {
  const eventName = req.params.event_name;

  try {
    const eventDetails = await Event.findOne({ event_name: eventName });

    if (!eventDetails) {
      return res.status(404).json({ message: `Event with event_name ${eventName} not found` });
    }

    res.json(eventDetails);
  } catch (error) {
    console.error('Error retrieving Event by event_name:', eventName, 'Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Update a event by the id in the request ******* success *********
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found!`
        });
      } else res.send({ message: "Event was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};


// Update a event by the event_name in the request ******* success *********
exports.updateByEventName = async (req, res) => {
  const eventName = req.params.event_name;
  const updatedEventData = req.body;

  try {
    // Find the existing event by event_name
    const existingEvent = await Event.findOne({ event_name: eventName });
    if (!existingEvent) {
      return res.status(404).json({ message: `Event with event_name ${eventName} not found` });
    }

    existingEvent.event_status = updatedEventData.event_status;
    existingEvent.event_artist = updatedEventData.event_artist;
    existingEvent.event_duration = updatedEventData.event_duration;
    existingEvent.event_start = updatedEventData.event_start;
    existingEvent.event_end = updatedEventData.event_end;
    existingEvent.event_location = updatedEventData.event_location;
    existingEvent.event_category = updatedEventData.event_category;
    existingEvent.event_rating = updatedEventData.event_rating;
    existingEvent.event_description = updatedEventData.event_description;
    existingEvent.event_picture = (updatedEventData.event_picture);

    // Save the updated event
    await existingEvent.save();

    res.json({ message: 'Event updated successfully', updatedEvent: existingEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




// Delete a event with the specified id in the request ******* success *********
/*
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
*/
// Delete a event with the specified event name in the request ******* success *********
exports.delete = (req, res) => {
  let event_name = req.params.event_name || req.body.event_name;

  Event.deleteByEventName(event_name)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with name=${event_name}. Maybe Event was not found!`
        });
      } else {
        res.send({
          message: "Event was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with name = " + event_name
      });
    });
};

// Delete all events from the database.  ******* success *********
exports.deleteAll = (req, res) => {
  Event.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Event were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
};

// Find all published events   ******* success *********
exports.findAllPublished = (req, res) => {
  Event.find({ event_status:"approved" }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};