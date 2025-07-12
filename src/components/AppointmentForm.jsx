// src/components/AppointmentForm.jsx
import React, { useState } from 'react';
import { doctors, patients } from '../data';
import './AppointmentForm.css';

const AppointmentForm = ({ selectedDate, onClose, onSave }) => {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      date: selectedDate,
      patient,
      doctor,
      time
    };
    onSave(appointment);
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-box">
        <h3>Add Appointment - {selectedDate}</h3>
        <form onSubmit={handleSubmit}>
          <label>Patient:</label>
          <select value={patient} onChange={(e) => setPatient(e.target.value)} required>
            <option value="">Select</option>
            {patients.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>

          <label>Doctor:</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
            <option value="">Select</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <div className="form-buttons">
            <button type="submit">Save</button>
            <button onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
