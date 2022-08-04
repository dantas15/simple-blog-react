import { Routes as RoutesWrapper, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home';
import { AuthenticationForm } from './pages/AuthenticationForm';
import { AdminArea } from './layouts/AdminArea';
import { PostContent } from './pages/PostContent';

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<AuthenticationForm />} />

      <Route path={'/app/*'} element={<AdminArea />} />

      <Route path={'/post/:slug'} element={<PostContent />} />

      <Route path={'*'} element={<NotFound />} />
    </RoutesWrapper>
  );
}
