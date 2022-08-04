import { Container } from '@mantine/core';
import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { SideNav } from '../components/SideNav';
import { Admin } from '../pages/Admin';
import { CreatePost } from '../pages/CreatePost';

export function AdminArea() {
  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <SideNav />
        <Container mt={20} mb={20} sx={{ display: 'block', width: '100%' }}>
          <RoutesWrapper>
            <Route path={'/'} element={<Admin />} />
            <Route path={'create'} element={<CreatePost />} />
            {/*<Route path={'edit/:id'} element={<Admin />} />
            <Route path={'users'} element={<Admin />} /> */}
          </RoutesWrapper>
        </Container>
      </div>
    </>
  );
}
