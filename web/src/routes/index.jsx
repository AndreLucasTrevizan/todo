import { Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { RecoverPassword } from '../pages/RecoverPassword';
import Register from '../pages/Register';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/recover-password' component={RecoverPassword} />
      <Route exact path='/home' component={Home} isPrivate />
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  );
}