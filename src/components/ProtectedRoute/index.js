import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const {component, path} = props
  const jwtToken = Cookies.get('jwtToken')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route exact path={path} component={component} />
}

export default ProtectedRoute
