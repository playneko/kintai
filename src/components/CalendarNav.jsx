import React from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import CalendarTab from './CalendarTab';
import useCalendarStore from '../store/calendarStore';
import '../assets/Calendar.css';
import 'dayjs/locale/ja';

function CalendarNav() {
  dayjs.locale('ja');
  const calendarData = useCalendarStore((state) => state);
  const setThisDate = useCalendarStore((state) => state.setThisDate);
  const selectedDate = calendarData.thisDate ? dayjs(calendarData.thisDate).toDate() : new Date();

  const handleDateChange = (value) => {
    setThisDate(dayjs(value).toString());
  };

  const tileClassName = ({ date, view }) => {
    const tileDateStr = dayjs(date).format('YYYY-MM-DD');
    const currentStr = dayjs(calendarData.thisDate || selectedDate).format('YYYY-MM-DD');
    if (currentStr === tileDateStr) {
      return 'today-highlight';
    }
    const startOfWeek = dayjs(calendarData.thisDate || selectedDate).startOf('week').toDate();
    const endOfWeek = dayjs(calendarData.thisDate || selectedDate).endOf('week').toDate();
    if (date < startOfWeek || date > endOfWeek) {
      return 'react-calendar__tile--hidden';
    }
    return null;
  };

  // 이전 버튼 핸들러
  const handlePrev = () => {
    const newDateStr = dayjs(calendarData.thisDate || selectedDate).subtract(1, 'week').toString();
    setThisDate(newDateStr);
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    const newDateStr = dayjs(calendarData.thisDate || selectedDate).add(1, 'week').toString();
    setThisDate(newDateStr);
  };

  return (
    <div className="App">
      <CalendarTab
        selectedDate={selectedDate}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <Calendar
        key={selectedDate.getTime()}
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