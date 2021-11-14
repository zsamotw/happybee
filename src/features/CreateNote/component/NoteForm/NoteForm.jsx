import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { format } from 'date-fns'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ButtonWithProgress from '../../../../shared/component/ButtonWithProgress'
import HBTextField from '../../../../shared/component/HBTextField'
import HBSelect from '../../../../shared/component/HBSelect'
import HBFileUpload from '../../../../shared/component/HBFileUpload'
import HBDatePicker from '../../../../shared/component/HBDatePicker'

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
  formControl: {
    minWidth: 120,
    margin: '1rem 1rem 2rem 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  errorBar: {
    color: 'red'
  }
}))

export default function NoteForm({
  isSendingData,
  onSubmitNote,
  error,
  categories,
  initialValues,
  editMode
}) {
  const classes = useStyles()

  const { t } = useTranslation('common')
  const history = useHistory()

  const defaultValues = {
    title: '',
    description: '',
    categoryId: '',
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    isPrivate: false
  }

  const { register, handleSubmit, errors, control, watch, setValue } = useForm({
    defaultValues
  })

  useEffect(() => {
    if (editMode && initialValues) {
      setValue('title', initialValues.title, true)
      setValue('description', initialValues.description, true)
      setValue('categoryId', initialValues.category.id)
      setValue(
        'createdAt',
        format(new Date(initialValues.createdAt), 'yyyy-MM-dd')
      )
      setValue('isPrivate', initialValues.isPrivate)
    }
  }, [initialValues, editMode, setValue])

  const titleInputProps = {
    id: 'titleName-input',
    label: t('notes.noteForm.inputs.title.label'),
    variant: 'outlined',
    name: 'title',
    type: 'text',
    fullWidth: true,
    placeholder: t('notes.noteForm.inputs.title.placeholder'),
    register: register({
      required: t('notes.noteForm.inputs.title.error.required'),
      maxLength: {
        value: 30,
        message: t('notes.noteForm.inputs.title.error.maxLength')
      }
    }),
    error: errors.title
  }

  const descriptionInputProps = {
    id: 'noteDescription-input',
    label: t('notes.noteForm.inputs.description.label'),
    variant: 'outlined',
    name: 'description',
    type: 'text',
    fullWidth: true,
    isMultiline: true,
    placeholder: t('notes.noteForm.inputs.description.placeholder'),
    register: register({
      required: t('notes.noteForm.inputs.description.error.required')
    }),
    error: errors.description
  }

  const handleNavigateBack = () => history.goBack()

  const onSubmit = formData => {
    onSubmitNote(formData)
  }

  return (
    <Box className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {HBTextField(titleInputProps)}
        {HBTextField(descriptionInputProps)}
        <Box width="50%" marginBottom="2rem">
          <HBSelect
            id="categoryId"
            labelId="category-select-label"
            name="categoryId"
            menuItems={categories}
            control={control}
            inputLabel={t('notes.noteForm.inputs.category.label')}
            rules={{
              required: t('notes.noteForm.inputs.category.error.required')
            }}
            error={errors.categoryId}
          />
        </Box>
        <Box width="50%" marginBottom="2rem">
          <HBDatePicker
            id="create-date-control"
            name="createdAt"
            label={t('notes.noteForm.inputs.createdAt.label')}
            register={register}
            fullWidth
          />
        </Box>
        <Box marginBottom="2rem">
          <HBFileUpload
            id="files-upload-control"
            dataTestId="file-upload-button"
            name="files"
            register={register}
            watch={watch}
            accept="image/*"
            multiple={false}
            error={errors.files}
          />
        </Box>
        <Box marginBottom="2rem">
          <FormControlLabel
            control={
              <Controller
                as={Checkbox}
                name="isPrivate"
                control={control}
                defaultValue={false}
              />
            }
            label={t('notes.noteForm.inputs.isPrivate.label')}
          />
        </Box>
        <div>
          <ButtonWithProgress
            variant="contained"
            color="primary"
            type="submit"
            text={t('notes.noteForm.buttons.submit')}
            isLoading={isSendingData}
          />
          <Button
            variant="contained"
            style={{ marginLeft: '1rem' }}
            onClick={handleNavigateBack}
          >
            {t('notes.noteForm.buttons.back')}
          </Button>
        </div>
        <div className={classes.errorBar}>
          {error && <p>{t('notes.noteForm.formError')}</p>}
        </div>
      </form>
    </Box>
  )
}
