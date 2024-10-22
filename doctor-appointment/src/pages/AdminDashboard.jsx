// src/pages/AdminDashboard.jsx
import  { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>All Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.name} - {appointment.phone} - {new Date(appointment.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
