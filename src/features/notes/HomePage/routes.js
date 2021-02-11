import AccountProfile from '../../account/AccountProfile'
import * as ROUTES from '../../../constants/routes'
import MainPage from '../MainPage'
import CreateNote from '../CreateNote'
import NotesContainer from '../NotesContainer'

const routes = path => [
  {
    path,
    exact: true,
    component: MainPage
  },
  {
    path: `${path}${ROUTES.ACCOUNT}`,
    exact: false,
    component: AccountProfile
  },
  {
    path: `${path}${ROUTES.NOTES}${ROUTES.CREATE_NOTE}`,
    exact: false,
    component: CreateNote
  },
  {
    path: `${path}${ROUTES.NOTES}`,
    exact: false,
    component: NotesContainer
  },
  {
    path,
    exact: false,
    component: MainPage
  }
]

export default routes
