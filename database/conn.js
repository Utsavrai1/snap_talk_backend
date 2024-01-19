const mongoose = require("mongoose");
const dbUrl = process.env.DATABASEURL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((e) => {
    console.log("No Database Connection");
  });
