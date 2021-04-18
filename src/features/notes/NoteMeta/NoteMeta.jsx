import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import { usePickNote } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  metaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 0'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1)
  },
  pickers: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default function NoteMeta(props) {
  const { note } = props
  const { author, pickers } = note
  const { t } = useTranslation('common')
  const theme = useTheme()
  const classes = useStyles(theme)

  const [handlePickNote, isPicked] = usePickNote(note)

  const pickersString = useMemo(() => {
    return pickers && pickers && pickers.length > 0
      ? pickers.map(p => p.displayName).join(', ')
      : t('notes.note.messageWhenEmptyPickers')
  }, [pickers, t])

  return (
    <div className={classes.metaContainer}>
      <div className={classes.author}>
        <Avatar className={classes.avatar}>
          {author.displayName.charAt(0)}
        </Avatar>
        <span>{author.displayName}</span>
      </div>
      <div
        role="button"
        tabIndex="0"
        className={classes.pickers}
        onClick={handlePickNote}
        onKeyDown={handlePickNote}
      >
        <Tooltip title={pickersString} arrow>
          <div
            style={{ marginRight: '10px', userSelect: 'none' }}
            data-testid="pickers"
          >
            {pickers.length}
          </div>
        </Tooltip>
        <SentimentVerySatisfiedIcon
          role="button"
          tabIndex="0"
          onClick={handlePickNote}
          onKeyDown={handlePickNote}
          style={{
            outline: 'none',
            cursor: 'pointer',
            color: isPicked(note)
              ? theme.palette.text.secondary
              : theme.palette.secondary.main
          }}
        />
      </div>
    </div>
  )
}
