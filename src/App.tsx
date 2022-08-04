import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Routes />
        <Footer />
      </MantineProvider>
    </BrowserRouter>
  );
}
