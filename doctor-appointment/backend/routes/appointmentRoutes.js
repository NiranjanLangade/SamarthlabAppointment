const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/book', async (req, res) => {
  const { name, phone, date } = req.body;

  try {
    const newAppointment = new Appointment({ name, phone, date });
    await newAppointment.save();

    client.messages.create({
      body: `New appointment booked by ${name} Mob.no : ${phone} for ${date}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+919561350845',
    });

    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book the appointment' });
  }
});


router.get('/', async (req, res) => {
  const { date } = req.query;

  try {
    const query = date ? { date: new Date(date) } : {};
    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});


router.post('/:id/note', async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: { note } },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Note saved successfully', updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the note' });
  }
});

router.get('/:id/note', async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ note: appointment.note });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the note' });
  }
});

module.exports = router;
