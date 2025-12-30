import { useEffect } from 'react';
import useCalendarStore from '../store/calendarStore';
import dayjs from 'dayjs';

function useCalendar() {
  const calendarData = useCalendarStore((state) => state);
  const setInputDate = useCalendarStore((state) => state.setInputDate);

  useEffect(() => {
    const dateStr = dayjs(calendarData.thisDate).format('YYYY-MM-DD');
    const resetParts = (calendarData.inputReset || '0:00').split(':').map((v) => Number(v) || 0);
    const resetMinutes = resetParts[0] * 60 + (resetParts[1] || 0);
    const start = dayjs(`${dateStr} ${calendarData.inputStart}`, 'YYYY-MM-DD HH:mm');
    let end = dayjs(`${dateStr} ${calendarData.inputEnd}`, 'YYYY-MM-DD HH:mm');
    if (end.isBefore(start)) {
      end = end.add(1, 'day');
    }
    let diffMinutes = end.diff(start, 'minute') - resetMinutes;
    if (isNaN(diffMinutes) || diffMinutes < 0) diffMinutes = 0;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    setInputDate(`${hours}:${String(minutes).padStart(2, '0')}`);
  }, [calendarData.inputStart, calendarData.inputEnd, calendarData.inputReset, calendarData.thisDate, setInputDate]);

  return null;
}

export default useCalendar;