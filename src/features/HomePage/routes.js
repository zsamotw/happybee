import AccountProfile from '../AccountProfile'
import routes from '../../constant/routes'
import MainPage from './component/MainPage'
import NoteDetails from '../Notes/view/NoteDetails'
import Notes from '../Notes/view/Notes'
import UserNotes from '../Notes/view/UserNotes'
import UpdateNote from '../Notes/view/UpdateNote/UpdateNote'
import CreateNote from '../Notes/view/CreateNote/CreateNote'

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
    path: `${path}${routes.notes}/:id/edit`,
    exact: false,
    component: UpdateNote
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
