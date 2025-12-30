import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import useCalendarHook from '../hook/useCalendar';
import useCalendarStore from '../store/calendarStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Home.css';

function Home() {
  dayjs.locale('ja');
  const calendarData = useCalendarStore((state) => state);
  const setInputStart = useCalendarStore((state) => state.setInputStart);
  const setInputEnd = useCalendarStore((state) => state.setInputEnd);
  const setInputReset = useCalendarStore((state) => state.setInputReset);

  // データ変更チェック
  useCalendarHook();

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
            <Button variant="contained" color="primary">登録</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Home;