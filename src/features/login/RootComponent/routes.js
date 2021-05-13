import routes from '../../../constants/routes'
import HomePage from '../../notes/HomePage'
import LandingPage from '../LandingPage'

const rootRoutes = [
  {
    path: routes.landingPage,
    exact: true,
    component: LandingPage,
    isPrivate: false
  },
  {
    path: routes.home,
    exact: false,
    component: HomePage,
    isPrivate: true
  },
  {
    path: routes.landingPage,
    exact: false,
    component: LandingPage,
    isPrivate: false
  }
]

export default rootRoutes
