import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import useFetcher from '../hook/useFetcher';
import useAuthStore from '../store/useAuthStore';
import { TextField, Button } from '@mui/material';

function Login() {
  const fetchData = useFetcher();
  const { setLogin } = useAuthStore();
  const [inputUserId, setInputUserId] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const API_KINTAI_LOGIN_URL = process.env.REACT_APP_API_KINTAI_MEMBER_AUTH_URL || process.env.API_KINTAI_MEMBER_AUTH_URL || '';

  // 勤怠データ取得
  const fetchLogin = async () => {
    const payload = {
      uid: inputUserId,
      password: inputPassword
    };

    setLoading(true);
    setError(false);
    setMessage('');

    await fetchData(API_KINTAI_LOGIN_URL, 'POST', payload)
      .then((data) => {
        if (data.success === true) {
          setLoading(false);
          localStorage.setItem("uid", data.rows[0].uid);
          setLogin();
        } else {
          setMessage(data.msg || '認証に失敗しました。');
          setError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        setMessage('エラーが発生しました。');
        setError(true);
        setLoading(false);
      });
  }

  return (
    <div className='login-container'>
      {
        error ?
          <Alert variant="filled" severity="warning" className="login-alert">
            {message}
          </Alert>
        : ""
      }
      <div>
        <TextField
          required
          id="outlined-required"
          label="ユーザーID"
          sx={{ m: 1, width: '25ch' }}
          onChange={(e) => setInputUserId(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          sx={{ m: 1, width: '25ch' }}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>
      {
        loading ?
          <div className="login-loading">ログイン中...</div>
        :
          <Button color="brown" variant="contained" sx={{ m: 1, width: '32ch' }} onClick={() => fetchLogin()}>ログイン</Button>
      }
    </div>
  );
}

export default Login;