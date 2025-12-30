import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CalendarNav from "../components/CalendarNav";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesome";
import '../assets/Kintai.css';

function Kintai() {
  const navigate = useNavigate();
  const handleSelectDateTimeChange = () => {
    navigate('/home');
  }

  return (
    <div>
      <CalendarNav />
      <Card sx={{ maxWidth: 345 }} className="kintai-card-content">
        <CardContent>
          <Button
            component="label"
            variant="contained"
            color="brown"
            tabIndex={-1}
            startIcon={<FontAwesomeIcon icon="clock" />}
            onClick={handleSelectDateTimeChange}
          >
            勤怠登録/更新
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Kintai;