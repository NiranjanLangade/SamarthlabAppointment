const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Booking an appointment
router.post('/book', async (req, res) => {
    const { name, email, phone, appointmentDate,gender, address } = req.body;
    try {
        // Create a new appointment with all required fields
        const newAppointment = new Appointment({
            name,
            email,
            phone,
            appointmentDate, // Make sure this is included
            gender,
            address // Ensure address is structured correctly
        });

        await newAppointment.save();

        // Send SMS notification
        await client.messages.create({
            body: `New appointment booked by ${name}, Mob.no: ${phone}, Appointment Date: ${appointmentDate}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+919561350845',
        });

        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Failed to book the appointment' });
    }
});

// Fetching appointments
router.get('/', async (req, res) => {
    const { date } = req.query;
    try {
        // If a date is provided, match against appointmentDate
        const query = date ? { appointmentDate: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } } : {};
        const appointments = await Appointment.find(query).sort({ appointmentDate: 1 });
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Saving a note for an appointment
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
        console.error('Error saving note:', error);
        res.status(500).json({ error: 'Failed to save the note' });
    }
});

// Fetching a note for an appointment
router.get('/:id/note', async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ note: appointment.note });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Failed to fetch the note' });
    }
});

module.exports = router;
