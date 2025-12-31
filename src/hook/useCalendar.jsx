import dayjs from 'dayjs';

function useCalendar(thisDate, inputStart, inputEnd, inputReset) {
  const dateStr = dayjs(thisDate).format('YYYY-MM-DD');
  const resetParts = (inputReset || '0:00').split(':').map((v) => Number(v) || 0);
  const resetMinutes = resetParts[0] * 60 + (resetParts[1] || 0);
  const start = dayjs(`${dateStr} ${inputStart}`, 'YYYY-MM-DD HH:mm');
  let end = dayjs(`${dateStr} ${inputEnd}`, 'YYYY-MM-DD HH:mm');
  if (end.isBefore(start)) {
    end = end.add(1, 'day');
  }
  let diffMinutes = end.diff(start, 'minute') - resetMinutes;
  if (isNaN(diffMinutes) || diffMinutes < 0) diffMinutes = 0;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export default useCalendar;