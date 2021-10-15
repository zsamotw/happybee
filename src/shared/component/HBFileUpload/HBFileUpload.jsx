import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles(theme => ({
  control: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '5px',
    width: '48px'
  },
  input: {
    display: 'none'
  },
  fileList: {
    marginTop: '1rem',
    color: `${theme.palette.grey[600]}`
  }
}))
export default function HBFileUpload({
  id,
  dataTestId,
  name,
  accept,
  multiple,
  register,
  error,
  watch
}) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const fileList = Object.values(watch(name, false))

  return (
    <FormControl>
      <div
        className={classes.control}
        style={error && { borderColor: '#f44336' }}
      >
        <label htmlFor={id}>
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
          <input
            className={classes.input}
            id={id}
            data-testid={dataTestId}
            name={name}
            ref={register}
            accept={accept}
            multiple={multiple}
            type="file"
          />
        </label>
      </div>
      {error && (
        <FormHelperText style={{ color: theme.palette.error.main }}>
          {error.message}
        </FormHelperText>
      )}
      <div className={classes.fileList}>
        {fileList &&
          fileList.map(file => <div key={file.size}>{file.name}</div>)}
      </div>
    </FormControl>
  )
}
