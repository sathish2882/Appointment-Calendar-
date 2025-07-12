import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';
import './CalendarView.css';

const CalendarView = () => {
  const history = useHistory();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(data);
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDayClick = (day) => {
    const fullDate = `${year}-${month + 1}-${day}`;
    setSelectedDate(fullDate);
    setShowForm(true);
  };

  const handleSaveAppointment = (appointment) => {
    const updated = [...appointments, appointment];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const handleDeleteAppointment = (appointmentToDelete) => {
    const updated = appointments.filter(
      (appt) =>
        !(
          appt.date === appointmentToDelete.date &&
          appt.patient === appointmentToDelete.patient &&
          appt.time === appointmentToDelete.time
        )
    );
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    history.push('/');
  };

  const getAppointmentsForDate = (dateStr) => {
    return appointments.filter((appt) => appt.date === dateStr);
  };

  const renderCalendar = () => {
    const cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month + 1}-${day}`;
      const dayAppointments = getAppointmentsForDate(dateStr);

      cells.push(
        <div key={day} className="calendar-cell" onClick={() => handleDayClick(day)}>
          <div className="cell-date">{day}</div>
          <div className="appointments">
            {dayAppointments.map((appt, index) => (
              <div key={index} className="appt-info">
                <span>{appt.time} - {appt.patient}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAppointment(appt);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <div className="calendar-header">
        <button onClick={handlePrev}>⟨</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={handleNext}>⟩</button>
      </div>

      <div className="calendar-grid-wrapper">
        <div className="calendar-grid">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
          {renderCalendar()}
        </div>
      </div>

      {showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          onClose={() => setShowForm(false)}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  );
};

export default CalendarView;
