import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import AppInput from '../../../components/AppInput'
import AppSelect from '../../../components/AppSelect'
import { CREATE_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest } from '../../../store/selectors'
import categories_ from '../../../constants/categories'
import AppFileUpload from '../../../components/AppFileUpload'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  },
  formControl: {
    minWidth: 120,
    margin: '1rem 1rem 2rem 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const CreateNoteForm = props => {
  const { createNote, isProcessingNote } = props

  const classes = useStyles()

  const { t } = useTranslation('common')

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState({})

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      FileUpload: null
    }
  })

  const history = useHistory()

  const categories = categories_.map(c => {
    return { ...c, label: t(`data.categories.${c.slug}`) }
  })

  useEffect(() => {
    setIsLoading(isProcessingNote)
  }, [isProcessingNote])

  const titleInputProps = {
    id: 'titleName-input',
    label: t('createNote.inputs.title.label'),
    variant: 'outlined',
    name: 'title',
    type: 'text',
    fullWidth: true,
    placeholder: t('createNote.inputs.title.placeholder'),
    register: register({
      required: t('createNote.inputs.title.error.required')
    }),
    error: errors.title
  }

  const descriptionInputProps = {
    id: 'noteDescription-input',
    label: t('createNote.inputs.description.label'),
    variant: 'outlined',
    name: 'description',
    type: 'text',
    fullWidth: true,
    isMultiline: true,
    placeholder: t('createNote.inputs.description.placeholder'),
    register: register({
      required: t('createNote.inputs.description.label')
    }),
    error: errors.description
  }

  const handleUploadFile = files => {
    setFile(files[0])
  }

  const onSubmit = ({ title, description, categoryId }) => {
    const category = categories.find(c => c.id === categoryId)
    const messageOnSuccess = t('createNote.messageOnCreateNoteSuccess')
    const messageOnError = t('createNote.messageOnCreateNoteError')
    const messageOnFileUploadError = t('createNote.messageOnFileUploadError')
    const pickers = []
    createNote({
      title,
      description,
      category,
      pickers,
      file,
      history,
      setError,
      messageOnSuccess,
      messageOnError,
      messageOnFileUploadError
    })
  }

  return (
    <Grid container>
      <Grid item className={classes.wrapper} xs={10} md={8} lg={4}>
        <h3>{t('createNote.title')}</h3>
        <h5>{t('createNote.description')}</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          {AppInput(titleInputProps)}
          {AppInput(descriptionInputProps)}
          <div style={{ width: '33%', marginBottom: '2rem' }}>
            <AppSelect
              id="categoryId"
              labelId="category-select-label"
              name="categoryId"
              menuItems={categories}
              control={control}
              inputLabel={t('createNote.inputs.category.label')}
              rules={{
                required: t('createNote.inputs.category.error.required')
              }}
              error={errors.categoryId}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <AppFileUpload
              id="image-upload-control"
              dataTestId="file-upload-button"
              name="imageUpload"
              onChange={handleUploadFile}
              accept="image/*"
              multiple={false}
              register={register({
                required: t('createNote.inputs.fileUpload.error.required')
              })}
              error={errors.imageUpload}
            />
          </div>
          <ButtonWithProgress
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            text={t('createNote.button')}
            isLoading={isLoading}
          />
          <div className={classes.errorBar}>
            {error && <p>{t('createNote.formError')}</p>}
          </div>
        </form>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isProcessingNote } = getIsAsyncRequest(state)
  return { isProcessingNote }
}

function mapDispatchToState(dispatch) {
  return {
    createNote: noteData => dispatch(CREATE_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(CreateNoteForm)
