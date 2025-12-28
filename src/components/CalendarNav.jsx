import React, { useState } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import CalendarTab from './CalendarTab';
import '../assets/App.css';
import 'dayjs/locale/ja';

function CalendarNav() {
  dayjs.locale('ja');
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate()); // 현재 선택된 날짜

  // 날짜 변경 핸들러
  const handleDateChange = (value) => {
    setSelectedDate(dayjs(value).toDate());
  };

  // 타일 클래스 설정
  const tileClassName = ({ date, view }) => {
    var thisDate = dayjs(selectedDate).toDate().toLocaleDateString('ja-JP');
    var toDate = dayjs(date).toDate().toLocaleDateString('ja-JP');
    if (thisDate === toDate) {
      return 'today-highlight'; // 오늘 날짜 강조 클래스
    }
    const startOfWeek = dayjs(selectedDate).startOf('week').toDate();
    const endOfWeek = dayjs(selectedDate).endOf('week').toDate();
    if (date < startOfWeek || date > endOfWeek) {
      return 'react-calendar__tile--hidden';
    }
    return null;
  };

  // 이전 버튼 핸들러
  const handlePrev = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'week').toDate() // 이전 주로 이동
    setSelectedDate(newDate); // 선택된 날짜 업데이트
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    const newDate = dayjs(selectedDate).add(1, 'week').toDate() // 다음 주로 이동
    setSelectedDate(newDate); // 선택된 날짜 업데이트
  };

  return (
    <div className="App">
      <CalendarTab
        selectedDate={selectedDate}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <Calendar
        key={selectedDate.toString()}
        onChange={(value) => handleDateChange(value)}
        value={selectedDate}
        view='month'
        locale='ja-JP'
        calendarType='gregory'
        tileClassName={tileClassName}
        formatMonthYear={(locale, date) => `${dayjs(date).year()}年 ${dayjs(date).month() + 1}月`}
        formatDay={(locale, date) => dayjs(date).date().toString()}
      />
      <p></p>
    </div>
  );
}

export default CalendarNav;