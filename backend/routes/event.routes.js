module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new events
    router.post("/", events.create);
  
    // Retrieve all events
    router.get("/", events.findAll);
  
    // Retrieve all published events
    router.get("/published", events.findAllPublished);
  
    // Retrieve a single events with id
    //router.get("/:id", events.findOne);
  
    // Retrieve a single events with title
    router.get("/:event_name", events.findByEventName);

    // Update a events with id
    //router.put("/:id", events.update);
  
    // Update a events with event_name
    router.put("/:event_name", events.updateByEventName);

    // Delete a events with id
    //router.delete("/:id", events.delete);

    // Delete a events with event_name
    router.delete("/:event_name", events.delete);
  
    // Delete all events
    router.delete("/", events.deleteAll);
  
    app.use('/api/events', router);
  };