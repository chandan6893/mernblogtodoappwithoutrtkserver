const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  blogsMainHeading: {
    type: String,
    required: true,
  },
  blogMainDescription: {
    type: String,
    // required: true,
  },
  blogWriterName: {
    type: String,
    required: true,
  },
  blogWriterIntro: {
    type: String,
    required: true,
  },
  blogWriterLinkdeinLink: {
    type: String,
    required: true,
  },
  blogsPostDate: {
    type: String,
    required: true,
  },
  blogHeadingImage: {
    type: String,
  },
  blogWriterImage: {
    type: String,
  },
  blogImageBackgroundColor: {
    type: String,
  },
  reactQuillValue:{
    type: String,
  }
});
const todoDB = new mongoose.model("todoDB", todoSchema);
module.exports = todoDB;
