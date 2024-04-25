const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("../backend/config/db.config");


const app = express();


/*
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "eventflix-session",
    keys: ["COOKIE_SECRET"], 
    httpOnly: true
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to eventflix application." });
});

//routes 
require('../backend/routes/auth.routes')(app);
require('../backend/routes/user.routes')(app);
require("../backend/routes/event.routes")(app);
require("../backend/routes/booking.routes")(app);
require("../backend/routes/muser.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./models");
const Role = db.role;

db.mongoose.set("strictQuery", false);
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }