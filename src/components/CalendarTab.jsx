import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FontAwesome";

function CalendarTab({ selectedDate, handlePrev, handleNext }) {
  return (
    <div className="calendar-nav">
      <div className="calendar-controls">
        <button type="button" onClick={handlePrev} aria-label="Previous">
          <FontAwesomeIcon icon="caret-left" />
        </button>
      </div>
      <div>{selectedDate.toLocaleDateString('ja-JP')}</div>
      <div className="calendar-controls">
        <button type="button" onClick={handleNext} aria-label="Next">
          <FontAwesomeIcon icon="caret-right" />
        </button>
      </div>
    </div>
  );
}

export default CalendarTab;
