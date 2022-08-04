import { Routes as RoutesWrapper, Route } from 'react-router-dom';

export function Routes() {
  return (
    <RoutesWrapper>
      <Route path={'/'} element={<h1>Hello World</h1>} />
    </RoutesWrapper>
  );
}
