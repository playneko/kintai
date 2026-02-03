import React from 'react';
import { TextField, Button } from '@mui/material';

function Login() {
  return (
    <div className='login-container'>
      <div>
        <TextField
          required
          id="outlined-required"
          label="ユーザーID"
          sx={{ m: 1, width: '25ch' }}
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
        />
      </div>
      <Button color="brown" variant="contained" sx={{ m: 1, width: '32ch' }}>ログイン</Button>
    </div>
  );
}

export default Login;