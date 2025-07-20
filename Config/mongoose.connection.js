import mongoose from "mongoose";
import debug from "debug";

const dbgr = debug("development:console");
const link = process.env.MONGO_URI;

// Mongoose Connection_Retry
const connectWithRetry = () => {
  mongoose
    .connect(link, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(function () {
      dbgr("connect");
    })
    .catch(function (err) {
      dbgr(err);
      setTimeout(connectWithRetry, 5000);
    });
};

// Export the Mongoose
export default connectWithRetry;
