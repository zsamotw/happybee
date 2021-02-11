import AccountProfile from '../../account/AccountProfile'
import * as ROUTES from '../../../constants/routes'
import MainPage from '../MainPage'
import CreateNote from '../CreateNote'
import NoteDetails from '../NoteDetails'
import NotesList from '../NotesList'

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
    exact: true,
    component: NotesList
  },
  {
    path: `${path}${ROUTES.NOTES}/:id`,
    exact: false,
    component: NoteDetails
  },
  {
    path,
    exact: false,
    component: MainPage
  }
]

export default routes
