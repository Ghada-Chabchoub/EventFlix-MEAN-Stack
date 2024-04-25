module.exports = app => {

var router = require("express").Router();

const muserController = require("../controllers/musers.controller");


// Routes for handling user operations

router.post("/create", muserController.createUser);
router.get("/", muserController.getAllUsers);
router.get("/:userId", muserController.getUser);
router.put("/:userId", muserController.updateUser);
router.delete("/:userId", muserController.deleteUser);

app.use('/api/users', router);

};