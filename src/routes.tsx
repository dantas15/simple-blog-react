import { Routes as RoutesWrapper, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home';
import { AuthenticationForm } from './pages/AuthenticationForm';

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<AuthenticationForm />} />

      <Route path={'*'} element={<NotFound />} />
    </RoutesWrapper>
  );
}
