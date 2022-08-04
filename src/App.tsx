import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AuthContextProvider>
          <>
            <Navbar />
            <Routes />
            <Footer />
          </>
        </AuthContextProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}
