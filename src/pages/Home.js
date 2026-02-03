import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import useFetcher from '../hook/useFetcher';
import useCalendarHook from '../hook/useCalendar';
import useCalendarStore from '../store/calendarStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Home.css';

function Home() {
  dayjs.locale('ja');
  const [isPosting, setIsPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [inputStart, setInputStart] = useState();
  const [inputEnd, setInputEnd] = useState();
  const [inputReset, setInputReset] = useState();
  const [inputProduction, setInputProduction] = useState();
  const [inputRemarks, setInputRemarks] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [calcDate, setCalcDate] = useState();

  const calendarData = useCalendarStore((state) => state);
  const fetchData = useFetcher();

  const API_KINTAI_GET_URL = process.env.REACT_APP_API_KINTAI_GET_URL || process.env.API_KINTAI_GET_URL || '';
  const API_KINTAI_UPDATE_URL = process.env.REACT_APP_API_KINTAI_UPDATE_URL || process.env.API_KINTAI_UPDATE_URL || '';

  // 日付フォーマット
  const formatDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY年 MM月 DD日");
  };

  // 入力日付フォーマット
  const inputDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY/MM/DD");
  };

  // 業務開始時間変更
  const handleStartTimeChange = (event) => {
    setInputStart(event.target.value);
  }

  // 業務終了時間変更
  const handleEndTimeChange = (event) => {
    setInputEnd(event.target.value);
  }

  // 休憩時間変更
  const handleResetTimeChange = (event) => {
    setInputReset(event.target.value);
  }

  const initData = () => {
    setInputStart('10:30');
    setInputEnd('19:00');
    setInputReset('1:00');
    setInputProduction('社内業務支援ツールの開発');
    setInputRemarks('');
    setIsUpdated(false);
    setIsPosting(false);
  }

  // 勤怠登録/更新
  const fetchKintaiUpdate = async () => {
    const payload = {
      uid: 'playneko',
      date_year: dayjs(calendarData.thisDate).format('YYYY'),
      date_month: dayjs(calendarData.thisDate).format('MM'),
      date_day: dayjs(calendarData.thisDate).format('DD'),
      everyday: inputDate(calendarData.thisDate),
      opening_time_start: inputStart,
      opening_time_end: inputEnd,
      reset_time: inputReset,
      production: inputProduction,
      remarks: inputRemarks,
    };
    setIsPosting(false);
    setLoading(true);
    fetchData(API_KINTAI_UPDATE_URL, 'POST', payload)
      .then((data) => {
        setIsPosting(true);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.body.msg || 'エラーが発生しました。');
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
    await fetchData(API_KINTAI_GET_URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
        console.log(data.rows);
          if (data.rows[0]) {
            const row = data.rows[0];
            setInputStart(row.opening_time_start || '');
            setInputEnd(row.opening_time_end || '');
            setInputReset(row.reset_time || '');
            setInputProduction(row.production || '');
            setInputRemarks(row.remarks || '');
            setIsUpdated(row.isUpdated || false);
          }
        } else {
          initData();
        }
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.body.msg || 'エラーが発生しました。');
        setError(true);
      });
  }

  useEffect(() => {
    fetchKintaiData();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarData.thisDate, fetchData]);

  useEffect(() => {
    // データ変更チェック
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const calcVal = useCalendarHook(calendarData.thisDate, inputStart, inputEnd, inputReset);
    setCalcDate(calcVal);
  }, [calendarData.thisDate, inputStart, inputEnd, inputReset, inputProduction]);

  const options = ['午前休', '午後休', '全休', '早退', '遅刻', '電車遅延', '体調不良', '私用'];

  return (
    <div className="home-main">
      {
        isPosting ? 
          <Alert variant="filled" severity="info" className="home-alert">
            勤怠登録/更新が完了しました。
          </Alert>
        : ""
      }
      <div className="home-container">
        {formatDate(calendarData.thisDate)}
      </div>
      <div className="home-input">
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '335px' } }}
          noValidate
          autoComplete="off"
        >
          <div className='home-workdate'>業務日</div>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              id="outlined-multiline-flexible"
              margin="dense"
              disabled
              defaultValue={inputDate(calendarData.thisDate)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon="calendar-days" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <div className='home-datetime'>業務開始時間</div>
          <TextField
            id="outlined-multiline-flexible"
            margin="dense"
            defaultValue={inputStart}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="clock" />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleStartTimeChange}
          />
          <div className='home-datetime'>業務終了時間</div>
          <TextField
            id="outlined-multiline-flexible"
            margin="dense"
            defaultValue={inputEnd}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="clock" />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleEndTimeChange}
          />
          <div className='home-datetime'>休憩</div>
          <TextField
            id="outlined-multiline-flexible"
            margin="dense"
            defaultValue={inputReset}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="clock" />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleResetTimeChange}
          />
          <div className='home-datetime'>実働時間</div>
          <TextField
            id="outlined-multiline-flexible"
            margin="dense"
            disabled
            defaultValue={calcDate}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="clock-rotate-left" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className='home-datetime'>作業内容</div>
          <TextField
            id="outlined-multiline-flexible"
            margin="dense"
            defaultValue={inputProduction}
          />
          <div className='home-datetime'>備考</div>
          <div className='home-remarks-info'>{inputRemarks}</div>
          <Autocomplete
            freeSolo
            disablePortal
            options={options}
            sx={{ width: 300 }}
            onInputChange={(event, newInputValue) => {
              setInputRemarks(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: 'search',
                  },
                }}
              />
            )}
          />
        </Box>
        <div className='home-bottom'>
          <Stack spacing={1} direction="row">
            {
              loading ? <CircularProgress color="secondary" size="30px" /> : <Button variant="contained" color="brown" onClick={fetchKintaiUpdate}>{isUpdated ? "更新" : "登録"}</Button>
            }
            {
              error ?
                <div>
                    <span className="error-text">{message}</span>
                    <Button variant="contained" color="brown" onClick={fetchKintaiUpdate}>再{isUpdated ? "更新" : "登録"}</Button>
                </div> : ""
            }
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Home;