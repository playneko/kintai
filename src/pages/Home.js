import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import useFetcher from '../hook/useFetcher';
import useCalendarHook from '../hook/useCalendar';
import useCalendarStore from '../store/calendarStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Home.css';

function Home() {
  dayjs.locale('ja');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const calendarData = useCalendarStore((state) => state);
  const setInputStart = useCalendarStore((state) => state.setInputStart);
  const setInputEnd = useCalendarStore((state) => state.setInputEnd);
  const setInputReset = useCalendarStore((state) => state.setInputReset);
  const fetchData = useFetcher();

  // データ変更チェック
  useCalendarHook();

  const API_KINTAI_ADD_URL = process.env.REACT_APP_API_KINTAI_ADD_URL || process.env.API_KINTAI_ADD_URL || '';

  const formatDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY年 MM月 DD日");
  };

  const inputDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY/MM/DD");
  };

  const handleStartTimeChange = (event) => {
    setInputStart(event.target.value);
  }

  const handleEndTimeChange = (event) => {
    setInputEnd(event.target.value);
  }

  const handleResetTimeChange = (event) => {
    setInputReset(event.target.value);
  }

  const fetchKintaiAdd = () => {
    const payload = {
      uid: 'playneko',
      date_year: dayjs(calendarData.thisDate).format('YYYY'),
      date_month: dayjs(calendarData.thisDate).format('MM'),
      date_day: dayjs(calendarData.thisDate).format('DD'),
      everyday: inputDate(calendarData.thisDate),
      opening_time_start: calendarData.inputStart,
      opening_time_end: calendarData.inputEnd,
      reset_time: calendarData.inputReset,
      production: calendarData.inputProduction,
      remarks: calendarData.inputRemarks,
    };
    setLoading(true);
    fetchData(API_KINTAI_ADD_URL, 'POST', payload)
      .then((data) => {
        console.log('Success:', data);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.body.msg || 'エラーが発生しました。');
        setError(true);
      });
  }

  const options = ['午前休', '午後休', '全休', '早退', '遅刻', '電車遅延'];

  return (
    <div className="home-main">
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
            defaultValue={calendarData.inputStart}
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
            defaultValue={calendarData.inputEnd}
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
            defaultValue={calendarData.inputReset}
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
            defaultValue={calendarData.inputDate}
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
            defaultValue={calendarData.inputProduction}
          />
          <div className='home-datetime'>備考</div>
          <Autocomplete
            freeSolo
            disablePortal
            options={options}
            sx={{ width: 300 }}
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
              loading ? <FontAwesomeIcon icon="spinner" spin /> : <Button variant="contained" color="brown" onClick={fetchKintaiAdd}>登録</Button>
            }
            {
              error ?
                <div>
                    <span className="error-text">{message}</span>
                    <Button variant="contained" color="brown" onClick={fetchKintaiAdd}>再登録</Button>
                </div> : ""
            }
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Home;