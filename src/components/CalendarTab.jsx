import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FontAwesome";
import dayjs from 'dayjs';

function CalendarTab({ selectedDate, handlePrev, handleNext }) {
  const display = dayjs(selectedDate).format('YYYY年 M月 D日');

  return (
    <div className="calendar-nav">
      <div className="calendar-controls">
        <button type="button" onClick={handlePrev} aria-label="Previous">
          <FontAwesomeIcon icon="caret-left" />
        </button>
      </div>
      <div className='calendar-date'>{display}</div>
      <div className="calendar-controls">
        <button type="button" onClick={handleNext} aria-label="Next">
          <FontAwesomeIcon icon="caret-right" />
        </button>
      </div>
    </div>
  );
}

export default CalendarTab;
