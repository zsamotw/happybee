import * as ROUTES from '../../../constants/routes'
import HomePage from '../../notes/HomePage'
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
    path: ROUTES.LANDING_PAGE,
    exact: false,
    component: LandingPage,
    isPrivate: false
  }
]

export default routes
