const mongoose = require('mongoose')

const model = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
      },
      topic: {
            type: String,
            required: true
      },
      date: {
            type: Date,
            required: true
      },
      content: {
            type: String,
            required: false
      },

});

module.exports = new mongoose.model("Blog", model)