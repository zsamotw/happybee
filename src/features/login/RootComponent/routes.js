import * as ROUTES from '../../../constants/routes'
import HomePage from '../../notes/HomePage'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import LandingPage from '../LandingPage'

const routes = [
  {
    path: ROUTES.LANDING_PAGE,
    exact: true,
    component: LandingPage,
    isPrivate: false
  },
  {
    path: ROUTES.HOME,
    exact: false,
    component: HomePage,
    isPrivate: true
  },
  {
    path: ROUTES.SIGN_UP,
    exact: false,
    component: SignUpPage,
    isPrivate: false
  },
  {
    path: ROUTES.SIGN_IN,
    exact: false,
    component: SignInPage,
    isPrivate: false
  },
  {
    path: ROUTES.LANDING_PAGE,
    exact: false,
    component: LandingPage,
    isPrivate: false
  }
]

export default routes
