// const mongoose = require("mongoose");
// const mongoUrl = "mongodb://localhost:27017/test";

// const connectToMongo = () => {
//   mongoose.connect(mongoUrl, () => {
//     console.log("connected to mongo sucessfully");
//   });
// };

// module.exports = connectToMongo;

const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/inotebook"; // Replace 'yourDatabaseName' with your actual database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectToMongo;
