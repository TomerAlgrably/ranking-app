const { Schema, model } = require('mongoose'); // Or your chosen ORM

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ... other fields if needed
});

module.exports = model('User', userSchema);