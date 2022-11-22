import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const {
    signed
  } = useContext(AuthContext);

  if (!signed && isPrivate) {
    return <Redirect to={'/'} />
  }

  if (signed && !isPrivate) {
    return <Redirect to={'/home'} />
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Component {...rest} />
      )}
    />
  );
}