import AccountProfile from '../../account/AccountProfile'
import routes from '../../../constants/routes'
import MainPage from '../MainPage'
import { CreateNote } from '../CreateNoteForm'
import NoteDetails from '../NoteDetails'
import Notes from '../Notes'
import UserNotes from '../UserNotes'

const homeRoutes = path => [
  {
    path,
    exact: true,
    component: MainPage
  },
  {
    path: `${path}${routes.account}`,
    exact: false,
    component: AccountProfile
  },
  {
    path: `${path}${routes.createNote}`,
    exact: false,
    component: CreateNote
  },
  {
    path: `${path}${routes.notes}`,
    exact: true,
    component: Notes
  },
  {
    path: `${path}${routes.user}/:userUid${routes.notes}`,
    exact: true,
    component: UserNotes
  },
  {
    path: `${path}${routes.notes}/:id`,
    exact: false,
    component: NoteDetails
  },
  {
    path,
    exact: false,
    component: MainPage
  }
]

export default homeRoutes
