const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  address: {
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  note: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
