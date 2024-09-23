import Image from "next/image";
import Login from "./components/Login";
import { Container, Box, Typography } from "@mui/material";

export const metadata = {
  title: "Ortex Login Page",
  description: "Login page for Ortex.com",
  manifest: "/manifest.json",
};

export default function Home() {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: 'rgb(15, 15, 15)',
        padding: 3,
      }}
      maxWidth={false}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          backgroundColor: 'rgb(21, 30, 35)', 
          visibility: 'visible',
          transition: 'background-color 0.5s ease 0s',
          borderBottom: '1px solid rgb(62, 62, 62)',
          width: '100%',
          zIndex: 7,
          position: 'fixed',
          top: 0,
          boxShadow: '0 3px 4px rgba(0,0,0,.15)', 

          '@media (min-width: 768px)': {
            height: '60px',
            top: '25px',
          },
          height: 'calc(40px + env(safe-area-inset-top))',
        }}
      >
        <Image
          src="/images/ortex-logo-h.png"
          alt="Ortex logo"
          width={145}
          height={30}
          priority
        />
      </Box>
      <Login />
    </Container>
  );
}
