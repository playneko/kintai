import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import useFetcher from '../hook/useFetcher';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import "../components/FontAwesome";
import '../assets/Print.css';

function Print() {
  const navigate = useNavigate();
  const fetchData = useFetcher();
  const handleChangePage = (thisDate) => {
    navigate('/print/view/' + thisDate);
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [lists, setLists] = useState([]);

  const API_KINTAI_GET_DATE_URL = process.env.REACT_APP_API_KINTAI_GET_DATE_URL || process.env.API_KINTAI_GET_DATE_URL || '';

  // 日付フォーマット
  const formatDate = (str) => {
    return dayjs(str).format("YYYY年 MM月");
  };

  // 勤怠データ取得
  const fetchKintaiData = async () => {
    const payload = {
      uid: 'playneko',
    };

    setLoading(true);
    setSuccess(false);
    setError(false);
    setMessage('');

    await fetchData(API_KINTAI_GET_DATE_URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
          setLists(data.rows);
          setLoading(false);
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
        : lists.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="print-card-content" onClick={() => handleChangePage(item.date_year + item.date_month)}>
              <CardContent>
                {formatDate(item.date_year + item.date_month)}
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  );
}

export default Print;