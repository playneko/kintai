import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarNav from "../components/CalendarNav";
import useFetcher from '../hook/useFetcher';
import useCalendarHook from '../hook/useCalendar';
import useCalendarStore from '../store/calendarStore';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Kintai.css';

function Kintai() {
  const navigate = useNavigate();
  const fetchData = useFetcher();
  const handleSelectDateTimeChange = () => {
    navigate('/home');
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [inputStart, setInputStart] = useState();
  const [inputEnd, setInputEnd] = useState();
  const [inputReset, setInputReset] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [calcDate, setCalcDate] = useState();
  const calendarData = useCalendarStore((state) => state);

  const API_KINTAI_GET_URL = process.env.REACT_APP_API_KINTAI_GET_URL || process.env.API_KINTAI_GET_URL || '';
  const API_KINTAI_CONFIRM_URL = process.env.REACT_APP_API_KINTAI_CONFIRM_URL || process.env.API_KINTAI_CONFIRM_URL || '';
  const API_KINTAI_CONFIRM_CANCLE_URL = process.env.REACT_APP_API_KINTAI_CONFIRM_CANCLE_URL || process.env.API_KINTAI_CONFIRM_CANCLE_URL || '';

  // 入力日付フォーマット
  const inputDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY/MM/DD");
  };

  const initData = () => {
    setLoading(false);
    setSuccess(false);
    setError(false);
    setMessage('');
    setInputStart();
    setInputEnd();
    setInputReset();
    setIsUpdated(false);
    setConfirm(false);
  }

  // 勤怠登録/更新
  const fetchKintaiUpdate = async (URL) => {
    const payload = {
      uid: 'playneko',
      everyday: inputDate(calendarData.thisDate)
    };

    setLoading(true);
    setSuccess(false);
    setError(false);
    setMessage('');

    fetchData(URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
          setConfirm(data.isConfirm || false);
          setSuccess(true);
          setLoading(false);
          setMessage('確定' + (data.isConfirm ? "" : "取消") + 'が成功しました。');
        } else {
          initData();
        }
      })
      .catch((error) => {
        setMessage('エラーが発生しました。');
        setError(true);
      });
  }

  // 勤怠データ取得
  const fetchKintaiData = async () => {
    const payload = {
      uid: 'playneko',
      everyday: inputDate(calendarData.thisDate),
    };

    setLoading(true);
    setSuccess(false);
    setError(false);
    setMessage('');

    await fetchData(API_KINTAI_GET_URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
          if (data.rows[0]) {
            const row = data.rows[0];
            setInputStart(row.opening_time_start || '');
            setInputEnd(row.opening_time_end || '');
            setInputReset(row.reset_time || '');
            setIsUpdated(row.isUpdated || false);
            setConfirm(row.confirm || false);
            setLoading(false);
          }
        } else {
          initData();
        }
      })
      .catch((error) => {
        setMessage('エラーが発生しました。');
        setError(true);
      });
  }

  useEffect(() => {
    fetchKintaiData();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarData.thisDate]);

  useEffect(() => {
    // データ変更チェック
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const calcVal = useCalendarHook(calendarData.thisDate, inputStart, inputEnd, inputReset);
    setCalcDate(calcVal);
  }, [calendarData.thisDate, inputStart, inputEnd, inputReset]);

  return (
    <div>
      <CalendarNav />
      {
        error ?
          <Alert variant="filled" severity="error" className="kintai-alert">
            {message}
          </Alert>
        : ""
      }
      {
        success ?
          <Alert variant="filled" severity="success" className="kintai-alert">
            {message}
          </Alert>
        : ""
      }
      <Card sx={{ maxWidth: 345 }} className="kintai-card-content-update" onClick={handleSelectDateTimeChange}>
        <CardContent>
          <FontAwesomeIcon
            icon="clock"
          />
          勤怠登録/更新
        </CardContent>
      </Card>
      {
        isUpdated ?
          <Card sx={{ maxWidth: 345 }} className="kintai-card-content-info">
            <CardContent>
              <FontAwesomeIcon
                icon="clock"
              />
              実働時間 : {calcDate}
            </CardContent>
          </Card>
        : ""
      }
      <div className="kintai-button">
      {
        loading ?
          <CircularProgress color="secondary" size="30px" />
        : !loading && isUpdated && isConfirm ?
          <Button variant="contained" color="error" startIcon={<FontAwesomeIcon icon="reply" />} onClick={() => fetchKintaiUpdate(API_KINTAI_CONFIRM_CANCLE_URL)}>
            確定取消
          </Button>
        : !loading && isUpdated && !isConfirm ?
          <Button variant="contained" color="secondary" startIcon={<FontAwesomeIcon icon="bullhorn" />} onClick={() => fetchKintaiUpdate(API_KINTAI_CONFIRM_URL)}>
            確定
          </Button>
        : ""
      }
      </div>
    </div>
  );
}

export default Kintai;