import { Routes as RoutesWrapper, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home';

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<Home />} />

      <Route path={'*'} element={<NotFound />} />
    </RoutesWrapper>
  );
}
