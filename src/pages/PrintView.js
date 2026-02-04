import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetcher from '../hook/useFetcher';
import useCalendarHook from '../hook/useCalendar';
import useAuthStore from '../store/useAuthStore';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ja';
import "../components/FontAwesome";
import '../assets/Print.css';
dayjs.extend(duration);
dayjs.locale('ja');

function PrintView() {
  const fetchData = useFetcher();
  const { postId } = useParams();

  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [lists, setLists] = useState([]);
  const [totalTime, setTotalTime] = useState('00:00');
  const { uid } = useAuthStore();

  const REACT_APP_API_KINTAI_GET_DETAIL_URL = process.env.REACT_APP_API_KINTAI_GET_DETAIL_URL || process.env.API_KINTAI_GET_DETAIL_URL || '';
  const REACT_APP_API_KINTAI_SUBMIT_URL = process.env.REACT_APP_API_KINTAI_SUBMIT_URL || process.env.API_KINTAI_SUBMIT_URL || '';
  const REACT_APP_API_KINTAI_EXCEL_MAKE_URL = process.env.REACT_APP_API_KINTAI_EXCEL_MAKE_URL || process.env.API_KINTAI_EXCEL_MAKE_URL || '';

  // 稼働時間
  const formatCalcDate = (everyday, opening_time_start, opening_time_end, reset_time) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const calcVal = useCalendarHook(everyday, opening_time_start, opening_time_end, reset_time);
    return calcVal;
  };

  // 合計時間計算
  const calcTimes = (times) => {
    let totalMinutes = 0;
    times.forEach(timeStr => {
      const time = dayjs(timeStr, 'HH:mm');
      totalMinutes += time.hour() * 60 + time.minute(); // 시간을 분으로 변환하여 합산
    });
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalTimeFormatted = `${totalHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
    return totalTimeFormatted;
  }

  // 勤怠データ取得
  const fetchKintaiData = async () => {
    const payload = {
      uid: uid,
      date_year: dayjs(postId).format("YYYY"),
      date_month: dayjs(postId).format("MM")
    };

    setLoading(true);
    setSuccess(false);
    setError(false);
    setMessage('');

    await fetchData(REACT_APP_API_KINTAI_GET_DETAIL_URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
          setLists(data.rows);
          const times = data.rows.map(list => `${list.everyday} ${formatCalcDate(list.everyday, list.opening_time_start, list.opening_time_end, list.reset_time)}`);
          const totalTimeFormatted = calcTimes(times);
          const submitRow = data.rows.find(row => row.isSubmitted === 1);
          if (submitRow) {
            setIsSubmit(true);
          }
          setTotalTime(totalTimeFormatted);
          setLoading(false);
        }
      })
      .catch((error) => {
        setMessage('エラーが発生しました。');
        setError(true);
      });
  }

  // 勤務表提出
  const handleSubmit = async (thisDate) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('勤務表を提出します。よろしいですか？') === true) {
      const payload = {
        uid: uid,
        everyday: thisDate
      };

      setLoading(true);
      setSuccess(false);
      setError(false);
      setMessage('');

      await fetchData(REACT_APP_API_KINTAI_SUBMIT_URL, 'POST', payload)
        .then((data) => {
          if (data.success === true) {
            setMessage('勤務表を提出しました。');
            setLoading(false);
            setSuccess(true);
            setIsSubmit(true);
          }
        })
        .catch((error) => {
          setMessage('エラーが発生しました。');
          setError(true);
        });
    }
  }

  const handleExcelMake = async (thisDate) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('勤務表をExcelで出力します。よろしいですか？') === true) {
      const payload = {
        uid: uid,
        everyday: thisDate
      };

      setLoading(true);
      setSuccess(false);
      setError(false);
      setMessage('');

      await fetchData(REACT_APP_API_KINTAI_EXCEL_MAKE_URL, 'POST', payload)
        .then((data) => {
          if (data.success === true) {
            setMessage('勤務表をExcelで出力しました。');
            setLoading(false);
            setSuccess(true);
            setIsSubmit(true);
          }
        })
        .catch((error) => {
          setMessage('エラーが発生しました。');
          setError(true);
        });
    }
  }

  useEffect(() => {
    fetchKintaiData();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        error ?
          <Alert variant="filled" severity="error" className="print-alert">
            {message}
          </Alert>
        : ""
      }
      {
        success ?
          <Alert variant="filled" severity="success" className="print-alert">
            {message}
          </Alert>
        : ""
      }
      {
        loading ?
          <Box sx={{ display: 'flex' }} className="print-loading">
            <CircularProgress />
          </Box>
        :
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>曜日</TableCell>
                  <TableCell>作業開始</TableCell>
                  <TableCell>作業終了</TableCell>
                  <TableCell>休憩</TableCell>
                  <TableCell>実働時間</TableCell>
                  <TableCell>作業内容</TableCell>
                  <TableCell>備考</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lists.map((item, index) => (
                  <TableRow
                    key={item.everyday}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={item.confirm === 0 ? "print-confirm" : ""}
                  >
                    <TableCell component="th" scope="row">
                      {item.date_day}
                    </TableCell>
                    <TableCell>
                      {dayjs(item.everyday).format('ddd')}
                    </TableCell>
                    <TableCell>
                      {item.opening_time_start}
                    </TableCell>
                    <TableCell>
                      {item.opening_time_end}
                    </TableCell>
                    <TableCell>
                      {item.reset_time}
                    </TableCell>
                    <TableCell>
                      {formatCalcDate(item.everyday, item.opening_time_start, item.opening_time_end, item.reset_time)}
                    </TableCell>
                    <TableCell>
                      {item.production}
                    </TableCell>
                    <TableCell>
                      {item.remarks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
      {
        !loading ?
          <div className="print-total-time">
            <FontAwesomeIcon icon="clock" className="print-clock" />
            実働時間合計：<span className="print-time-text">{totalTime}</span>時間
          </div>
        : ""
      }
      {
        !loading && !isSubmit && lists.length > 0 ?
          <div className="print-submit-button">
            <Button variant="contained" color="brown" onClick={() => handleSubmit(postId)}>
              勤務表提出
            </Button>
          </div>
        : !loading && isSubmit ?
          <div className="print-submit-button">
            <Button variant="contained" color="brown" onClick={() => handleExcelMake(postId)}>
              勤務表Excelダウンロード
            </Button>
          </div>
        : ""
      }
    </div>
  );
}

export default PrintView;