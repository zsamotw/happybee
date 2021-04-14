import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import AppInput from '../../../components/AppInput'
import AppSelect from '../../../components/AppSelect'
import { CREATE_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { getIsAsyncRequest } from '../../../store/selectors'
import categories_ from '../../../constants/categories'
import AppFileUpload from '../../../components/AppFileUpload'
import * as ROUTES from '../../../constants/routes'
import { useCurrentViewTitle } from '../../../hooks'
import AppDatePicker from '../../../components/app-date-picker'

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
  const { createNote, isSendingData } = props

  const classes = useStyles()

  const { t } = useTranslation('common')

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      createdAt: format(new Date(), 'yyyy-MM-dd')
    }
  })

  const history = useHistory()

  useCurrentViewTitle(t('notes.createNote.pageTitle'))

  const categories = categories_.map(c => {
    return { ...c, label: t(`data.categories.${c.slug}`) }
  })

  useEffect(() => {
    setIsLoading(isSendingData)
  }, [isSendingData])

  const titleInputProps = {
    id: 'titleName-input',
    label: t('notes.createNote.inputs.title.label'),
    variant: 'outlined',
    name: 'title',
    type: 'text',
    fullWidth: true,
    placeholder: t('notes.createNote.inputs.title.placeholder'),
    register: register({
      required: t('notes.createNote.inputs.title.error.required'),
      maxLength: {
        value: 30,
        message: t('notes.createNote.inputs.title.error.maxLength')
      }
    }),
    error: errors.title
  }

  const descriptionInputProps = {
    id: 'noteDescription-input',
    label: t('notes.createNote.inputs.description.label'),
    variant: 'outlined',
    name: 'description',
    type: 'text',
    fullWidth: true,
    isMultiline: true,
    placeholder: t('notes.createNote.inputs.description.placeholder'),
    register: register({
      required: t('notes.createNote.inputs.description.error.required')
    }),
    error: errors.description
  }

  const handleNavigateBack = () => history.goBack()

  const onSubmit = ({ title, description, categoryId, createdAt, files }) => {
    const category = categories.find(c => c.id === categoryId)
    const file = files ? files[0] : null
    const messageOnSuccess = t('notes.createNote.messageOnCreateNoteSuccess')
    const messageOnError = t('notes.createNote.messageOnCreateNoteError')
    const messageOnFileUploadError = t(
      'notes.createNote.messageOnFileUploadError'
    )
    const pickers = []
    const navigateHome = () => history.push(ROUTES.HOME)
    createNote({
      title,
      description,
      category,
      createdAt: new Date(createdAt),
      pickers,
      file,
      navigateHome,
      setError,
      messageOnSuccess,
      messageOnError,
      messageOnFileUploadError
    })
  }

  return (
    <Grid container>
      <Grid item className={classes.wrapper} xs={10} md={8} lg={4}>
        <section>
          <h3>{t('notes.createNote.title')}</h3>
          <h5>{t('notes.createNote.description')}</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            {AppInput(titleInputProps)}
            {AppInput(descriptionInputProps)}
            <div style={{ width: '50%', marginBottom: '2rem' }}>
              <AppSelect
                id="categoryId"
                labelId="category-select-label"
                name="categoryId"
                menuItems={categories}
                control={control}
                inputLabel={t('notes.createNote.inputs.category.label')}
                rules={{
                  required: t('notes.createNote.inputs.category.error.required')
                }}
                error={errors.categoryId}
              />
            </div>
            <div style={{ width: '50%', marginBottom: '2rem' }}>
              <AppDatePicker
                id="create-date-control"
                name="createdAt"
                label={t('notes.createNote.inputs.createdAt.label')}
                register={register}
                fullWidth
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <AppFileUpload
                id="files-upload-control"
                dataTestId="file-upload-button"
                name="files"
                register={register}
                watch={watch}
                accept="image/*"
                multiple={false}
                error={errors.files}
              />
            </div>
            <div>
              <ButtonWithProgress
                variant="contained"
                color="primary"
                type="submit"
                text={t('notes.createNote.buttons.submit')}
                isLoading={isLoading}
              />
              <Button
                variant="contained"
                style={{ marginLeft: '1rem' }}
                onClick={handleNavigateBack}
              >
                {t('notes.createNote.buttons.back')}
              </Button>
            </div>
            <div className={classes.errorBar}>
              {error && <p>{t('notes.createNote.formError')}</p>}
            </div>
          </form>
        </section>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isSendingData } = getIsAsyncRequest(state)
  return { isSendingData }
}

function mapDispatchToState(dispatch) {
  return {
    createNote: noteData => dispatch(CREATE_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(CreateNoteForm)