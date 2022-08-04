import { Routes as RoutesWrapper, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home';
import { AuthenticationForm } from './pages/AuthenticationForm';
import { AdminArea } from './layouts/AdminArea';

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<AuthenticationForm />} />

      <Route path={'/app/*'} element={<AdminArea />} />

      <Route path={'/post/:id'} />

      <Route path={'*'} element={<NotFound />} />
    </RoutesWrapper>
  );
}
