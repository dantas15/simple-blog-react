import { useContext } from 'react';
import {
  Routes as RoutesWrapper,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home';
import { AuthenticationForm } from './pages/AuthenticationForm';
import { AdminArea } from './layouts/AdminArea';
import { PostContent } from './pages/PostContent';
import { AuthContext } from './contexts/AuthContext';

const Admin = () => {
  const { authenticated, loading, userIsAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <LoadingOverlay visible={true} overlayBlur={2} />
      </div>
    );
  }
  return authenticated ? (
    userIsAdmin ? (
      <Outlet />
    ) : null
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<AuthenticationForm />} />

      <Route element={<Admin />}>
        <Route path={'/app/*'} element={<AdminArea />} />
      </Route>
      <Route path={'/post/:slug'} element={<PostContent />} />

      <Route path={'*'} element={<NotFound />} />
    </RoutesWrapper>
  );
}
