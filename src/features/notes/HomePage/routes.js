import AccountProfile from '../../account/AccountProfile'
import * as ROUTES from '../../../constants/routes'
import MainPage from '../MainPage'
import CreateNote from '../CreateNote'
import NoteDetails from '../NoteDetails'
import Notes from '../Notes'
import PickedNotes from '../PickedNotes'

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
    path: `${path}${ROUTES.CREATE_NOTE}`,
    exact: false,
    component: CreateNote
  },
  {
    path: `${path}${ROUTES.NOTES}`,
    exact: true,
    component: Notes
  },
  {
    path: `${path}${ROUTES.PICKED_NOTES}`,
    exact: true,
    component: PickedNotes
  },
  {
    path: `${path}${ROUTES.PICKED_NOTES}/:id`,
    exact: true,
    component: NoteDetails
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
