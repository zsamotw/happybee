import React from 'react'
import { useTranslation } from 'react-i18next'
import { fade, makeStyles, useTheme } from '@material-ui/core'
import { connect } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { SET_NOTE_QUERY_FILTER } from '../../../store/actions/sync-actions'
import { getNoteFilters } from '../../../store/selectors'

const useStyles = makeStyles((theme, isVisible) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    visibility: `${isVisible ? 'visible' : 'hidden'}`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

function SearchBar(props) {
  const { setQueryFilter, query, isVisible, className } = props
  const { t } = useTranslation('common')

  const handleQueryChange = event => {
    setQueryFilter(event.target.value)
  }

  const theme = useTheme()
  const classes = useStyles(theme, isVisible)

  return (
    <div
      className={`${classes.search} ${className}`}
      style={isVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}
    >
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        id="note-search"
        label={t('notes.searchBar.input.label')}
        placeholder={t('notes.searchBar.input.placeholder')}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={handleQueryChange}
        value={query}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

function mapStateToProps(state) {
  const { query } = getNoteFilters(state)
  return { query }
}

function mapDispatchToState(dispatch) {
  return {
    setQueryFilter: query => dispatch(SET_NOTE_QUERY_FILTER(query))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(SearchBar)
