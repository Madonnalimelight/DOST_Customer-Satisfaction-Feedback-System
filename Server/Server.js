require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./Routes/workouts");
const customerProfilesRoutes = require("./Routes/customerprofile.js");
const customerEvaluationRoutes = require("./Routes/customerevaluation.js");
const servicesRoutes = require("./Routes/services");
const libraryUserRoutes = require("./Routes/libraryuser.js");
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Middleware to log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Use workout routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/customerprofile", customerProfilesRoutes);
app.use("/api/customerevaluation", customerEvaluationRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/libraryuser", libraryUserRoutes);
// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true, // Deprecated option removed
    // useUnifiedTopology: true, // Deprecated option removed
  })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(
        `Connected to the DB and server is running on port ${port}!!`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
