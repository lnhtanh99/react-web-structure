import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const DetailPage = lazy(() => import('./modules/home/pages/Detail/DetailPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.signUp} component={SignUpPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.profile} component={DetailPage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={`${ROUTES.detail}/:id`} component={DetailPage} />
        <Route path="/" component={LoginPage} />
        
      </Switch>
    </Suspense>
  );
};
