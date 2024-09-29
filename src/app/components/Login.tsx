"use client";
import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Modal,
  Snackbar,
  Alert,
  Grid,
  Divider,
  InputAdornment,
} from '@mui/material';
import FadeLoader from 'react-spinners/FadeLoader';
import { Google as GoogleIcon, Apple as AppleIcon, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [price, setPrice] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [loadingModal, setLoadingModal] = useState(true); 

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setLoadingModal(false);
      }, 2000); 
    }
  }, [showModal]);
  useEffect(() => {
    const socket = new WebSocket('ws://stream.tradingeconomics.com/?client=guest:guest');
    socket.onopen = () => {
      socket.send(JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.price) {
        setPrice(data.price);
        const utcDate = new Date(data.dt);
        setTimestamp(utcDate.toLocaleString());
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error(isLoginView ? 'Login failed' : 'Sign up failed');
      }
      const data = await response.json();
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleGoogleLogin = () => {
    console.log('hola');
  };

  const handleAppleLogin = () => {
    console.log('hola');
  };

  return (
    <Container component="main" sx={{ maxWidth: { xs: '100%', sm: 600 } }}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ color: 'rgb(230, 230, 230)', fontWeight: 800, textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          {isLoginView ? 'Sign in' : 'Sign up'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: 'rgb(230, 230, 230)' }, required: false }}
            InputProps={{ style: { color: 'rgb(230, 230, 230)' } }}
          />
          <Divider sx={{ my: 1, bgcolor: 'rgb(230, 230, 230)' }} />          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: 'rgb(230, 230, 230)' }, required: false }}
            slotProps={{
              input: {
                style: { color: 'rgb(230, 230, 230)' },
                endAdornment: (
                  <InputAdornment position="end"  sx={{ color: 'rgb(230, 230, 230)' }}>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: 'rgb(230, 230, 230)', padding: 0 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Divider sx={{ my: 1, bgcolor: 'rgb(230, 230, 230)' }} />          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, color: ' rgb(230, 230, 230)', bgcolor:' rgb(49, 171, 166)'}}>
            {isLoginView ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        {isLoginView && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs>
            <Button variant="text" onClick={() => { setShowModal(true); setLoadingModal(true); }} sx={{ color: ' rgb(49, 171, 166)', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontWeight: 500, fontSize: '0.875rem', textTransform: 'capitalize' }}>
                Forgot Password?
              </Button>
            </Grid>
          </Grid>
        )}

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              fullWidth
              sx={{ mb: 1, bgcolor:'transparent', border: 'solid 1px white' }}   
            >
              Login with Google
            </Button>
            <Button
              variant="contained"
              startIcon={<AppleIcon />}
              onClick={handleAppleLogin}
              fullWidth
              sx={{bgcolor:'transparent', border: 'solid 1px white'}}
            >
              Login with Apple
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="text"
              onClick={() => setIsLoginView(!isLoginView)}
              sx={{ color: 'rgb(230, 230, 230)' }}
            >
              {isLoginView ? "No account? Sign up" : "Have an account? Login"}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ color: 'rgb(230, 230, 230)' }}>
            EUR/USD Price: {price !== null ? `$${price}` : 'Loading...'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgb(230, 230, 230)' }}>
            Latest Timestamp: {timestamp}
          </Typography>
        </Box>
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
  {loadingModal ? (
    <Box
      sx={{
        position: 'fixed', 
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        width: '80px', 
        height: '80px', 
        backgroundImage: `url('/images/isotipo.png')`, 
        backgroundSize: '20px', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        borderRadius: '50%', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'black'
      }}
    >
        <FadeLoader color="rgb(49, 171, 166)" height={15} width={5} radius={9} margin={8} />
    </Box>
  ) : (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'rgb(230, 230, 230)',
        p: 4,
        borderRadius: 2,
        boxShadow: 24,
        maxWidth: { xs: '90%', sm: 400 },
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reset Password
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={() => setShowModal(false)}
        sx={{ mt: 2, bgcolor: 'rgb(49, 171, 166)', color: 'white' }}
      >
        Send Reset Link
      </Button>
    </Box>
  )}
</Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      </Container>
  );
};

export default Login;