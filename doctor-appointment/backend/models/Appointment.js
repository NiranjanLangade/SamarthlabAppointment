const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    default: '', // Initial default value for notes
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
