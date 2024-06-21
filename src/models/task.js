const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  resume: String
});
taskSchema.plugin(mongoosePaginate);
const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
taskSchema.plugin(mongoosePaginate);
