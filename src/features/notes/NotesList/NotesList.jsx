import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GET_NOTES_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest, getNotes } from '../../../store/selectors'
import Note from '../Note'
import { SET_SEARCHBAR_CONFIG } from '../../../store/actions/sync-actions'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  gridContainer: {
    marginTop: '2rem',
    padding: '0 15rem',
    [theme.breakpoints.down('lg')]: {
      padding: '0 10rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 3rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 1rem'
    }
  }
}))

function NotesList(props) {
  const { getNotesList, setSearchConfig, notes, isProcessingNote } = props
  const theme = useTheme()
  const classes = useStyles(theme)
  const { t } = useTranslation('common')

  useEffect(() => {
    const messageOnError = t('notesList.messageOnNoteLoadError')
    getNotesList(messageOnError)
    setSearchConfig({ isVisible: true, collectionName: 'notes' })

    return () => {
      setSearchConfig({ isVisible: false, collection: '' })
    }
  }, [getNotesList, setSearchConfig, t])

  return (
    <Grid container>
      <Backdrop className={classes.backdrop} open={isProcessingNote}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {notes ? notes.map(note => <Note note={note} key={note.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isProcessingNote } = getIsAsyncRequest(state)
  const notes = getNotes(state)
  return { isProcessingNote, notes }
}

function mapDispatchToState(dispatch) {
  return {
    getNotesList: messageOnError => dispatch(GET_NOTES_REQUEST(messageOnError)),
    setSearchConfig: config => dispatch(SET_SEARCHBAR_CONFIG(config))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NotesList)
