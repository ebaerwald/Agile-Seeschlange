const mongoose = require("mongoose");

const uri =
  "mongodb+srv://datauser:sicherespasswort@cluster0.vqj3oad.mongodb.net/prisma?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected with MongoDB on ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
