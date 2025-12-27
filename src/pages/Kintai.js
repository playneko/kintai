import React, { useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';

function Kintai() {
  // 상태값 정의
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate()); // 현재 선택된 날짜

  // 날짜 변경 핸들러
  const handleDateChange = (value) => {
    setSelectedDate(dayjs(value).toDate());
  };

  // 타일 클래스 설정
  const tileClassName = ({ date }) => {
    const startOfWeek = dayjs(selectedDate).startOf('week').toDate();
    const endOfWeek = dayjs(selectedDate).endOf('week').toDate();
    if (date < startOfWeek || date > endOfWeek) {
      return 'react-calendar__tile--hidden';
    }
    return null;
  };

  return (
    <div className="App">
      <Calendar
        key={selectedDate.toString()}
        onChange={(value) => handleDateChange(value)}
        value={selectedDate}
        view='month'
        tileClassName={tileClassName}
        formatMonthYear={(locale, date) => `${dayjs(date).year()}년 ${dayjs(date).month() + 1}월`}
        formatDay={(locale, date) => dayjs(date).date().toString()}
        locale='ja-JP'
      />
      <p>{selectedDate.toLocaleDateString('ja-JP')}</p>
    </div>
  );
}

export default Kintai;