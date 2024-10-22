// backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const twilio = require('twilio');

// Initialize Twilio client
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// POST: Book an appointment
router.post('/book', async (req, res) => {
  const { name, phone, date } = req.body;

  try {
    // Save appointment to the database
    const newAppointment = new Appointment({ name, phone, date });
    await newAppointment.save();

    // Send SMS to the doctor
    client.messages.create({
      body: `New appointment booked by ${name} for ${date}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+919561350845', // Replace with doctor's phone number
    });

    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book the appointment' });
  }
});

// GET: Fetch all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;
