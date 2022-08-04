import { Container } from '@mantine/core';
import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { SideNav } from '../components/SideNav';
import { Admin } from '../pages/Admin';
import { FormPost } from '../pages/FormPost';
import { Users } from '../pages/Users';

export function AdminArea() {
  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <SideNav />
        <Container mt={20} mb={20} sx={{ display: 'block', width: '100%' }}>
          <RoutesWrapper>
            <Route path={'/'} element={<Admin />} />
            <Route path={'post'} element={<FormPost />} />
            <Route path={'post/:slug'} element={<FormPost />} />
            <Route path={'users'} element={<Users />} />
          </RoutesWrapper>
        </Container>
      </div>
    </>
  );
}
