import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AuthContextProvider>
            <>
              <Navbar />
              <Routes />
              <Footer />
            </>
          </AuthContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}
