import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import "./Admin.css";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedNote, setSelectedNote] = useState('');
  const [editNote, setEditNote] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments?date=${selectedDate}`);
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const handleViewNote = async (appointmentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/${appointmentId}/note`);
      setSelectedNote(response.data.note || 'No note available.');
      setSelectedAppointment(appointmentId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveNote = async () => {
    try {
      await axios.post(`http://localhost:5000/api/appointments/${selectedAppointment}/note`, { note: editNote });
      setSelectedNote(editNote);
      setEditNote('');
      alert('Note saved successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>All Appointments</h1>


      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Appointment Cards */}
      <div className="appointment-cards-container">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <div className="appointment-details">
              <span>{appointment.name} - {appointment.phone} - {new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <button onClick={() => handleViewNote(appointment._id)}>View Note</button>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      {selectedNote && (
        <div className="note-section">
          <h2>Note for Appointment</h2>
          <p>{selectedNote}</p>

          {/* Edit Note Section */}
          <label>Edit Note:</label>
          <textarea
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          />
          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
