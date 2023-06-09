import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    icon: {
      type: String
    }
  },
  { timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);
export default Location;