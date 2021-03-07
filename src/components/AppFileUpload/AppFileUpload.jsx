import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withTheme } from '@material-ui/core/styles'
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
const appFileUpload = function AppFileUpload({
  id,
  dataTestId,
  name,
  onChange,
  accept,
  multiple,
  register,
  error,
  theme
}) {
  const classes = useStyles(theme)
  const [fileList, setFileList] = useState([])

  const handleChange = event => {
    const { files } = event.target
    setFileList(Object.values(files))
    onChange(event.target.files)
  }

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
            onChange={handleChange}
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

export default withTheme(appFileUpload)
