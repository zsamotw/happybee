import AccountProfile from '../AccountProfile'
import routes from '../../constant/routes'
import MainPage from './component/MainPage'
import { CreateNote } from '../CreateNote'
import NoteDetails from '../Notes/component/NoteDetails'
import Notes from '../Notes/view/AllNotes'
import UserNotes from '../Notes/view/UserNotes'

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
