import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,
  content: String,
});

export default mongoose.models.noteModel || mongoose.model("noteModel", noteSchema);