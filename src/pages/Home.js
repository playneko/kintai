import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Home.css';

function Home() {
  dayjs.locale('ja');

  const [selectInputData, setSelectInputData] = useState({
    thisDate: dayjs().toString(),
    inputDate: '',
    inputStart: '10:30',
    inputEnd: '19:00',
    inputReset: '1:00',
    inputProduction: '社内業務支援ツールの開発',
    inputRemarks: '',
  });

  // const [selectedDate] = useState(dayjs().toDate()); // 현재 선택된 날짜
  // const [inputDateValue, setInputDateValue] = useState(); // 현재 선택된 날짜
  // const [inputStart, setInputStart] = useState('10:30');
  // const [inputEnd, setInputEnd] = useState('19:00');
  // const [inputReset, setInputReset] = useState('1:00');

  const formatDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY年 MM月 DD日");
  };

  const inputDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY/MM/DD");
  };

  const handleStartTimeChange = (event) => {
    setSelectInputData({...selectInputData, inputStart: event.target.value});
  }

  const handleEndTimeChange = (event) => {
    setSelectInputData({...selectInputData, inputEnd: event.target.value});
  }

  const handleResetTimeChange = (event) => {
    setSelectInputData({...selectInputData, inputReset: event.target.value});
  }

  useEffect(() => {
    const dateStr = dayjs(selectInputData.thisDate).format('YYYY-MM-DD');
    const resetParts = (selectInputData.inputReset || '0:00').split(':').map((v) => Number(v) || 0);
    const resetMinutes = resetParts[0] * 60 + (resetParts[1] || 0);
    const start = dayjs(`${dateStr} ${selectInputData.inputStart}`, 'YYYY-MM-DD HH:mm');
    let end = dayjs(`${dateStr} ${selectInputData.inputEnd}`, 'YYYY-MM-DD HH:mm');
    if (end.isBefore(start)) {
      end = end.add(1, 'day');
    }
    let diffMinutes = end.diff(start, 'minute') - resetMinutes;
    if (isNaN(diffMinutes) || diffMinutes < 0) diffMinutes = 0;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    setSelectInputData((prev) => ({...prev, inputDate: `${hours}:${minutes.toString().padStart(2, '0')}`}));
  }, [selectInputData.inputStart, selectInputData.inputEnd, selectInputData.inputReset, selectInputData.thisDate]);

  const options = ['午前休', '午後休', '全休', '早退', '遅刻', '電車遅延'];

  return (
    <div className="home-main">
      <div className="home-container">
        {formatDate(selectInputData.thisDate)}
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
              defaultValue={inputDate(selectInputData.thisDate)}
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
            defaultValue={selectInputData.inputStart}
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
            defaultValue={selectInputData.inputEnd}
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
            defaultValue={selectInputData.inputReset}
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
            defaultValue={selectInputData.inputDate}
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
            defaultValue={selectInputData.inputProduction}
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
            <Button variant="contained" color="primary">登録</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Home;