import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import AppInput from '../../../components/AppInput'
import { CHANGE_USER_PASSWORD_REQUEST } from '../../../store/actions/async-actions'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  }
})

const PasswordChangeForm = props => {
  const { changePassword, isFetchingChangePasswordData, email } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: { passwordOld: '', passwordOne: '', passwordTwo: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingChangePasswordData)
  }, [isFetchingChangePasswordData])

  const passwordOldInputProps = {
    id: 'passwordOld-input',
    label: t('passwordChange.inputs.passwordOld.label'),
    variant: 'outlined',
    name: 'passwordOld',
    type: 'password',
    placeholder: t('passwordChange.inputs.passwordOld.placeholder'),
    register: register({
      required: t('passwordChange.inputs.error.required'),
      minLength: {
        value: 6,
        message: t('passwordChange.inputs.error.invalid')
      }
    }),
    error: errors.passwordOld,
    fullWidth: true
  }

  const passwordOneInputProps = {
    id: 'passwordOne-input',
    label: t('passwordChange.inputs.passwordOne.label'),
    variant: 'outlined',
    name: 'passwordOne',
    type: 'password',
    placeholder: t('passwordChange.inputs.passwordOne.placeholder'),
    register: register({
      required: t('passwordChange.inputs.error.required'),
      minLength: { value: 6, message: t('passwordChange.inputs.error.invalid') }
    }),
    error: errors.passwordOne,
    fullWidth: true
  }

  const passwordTwoInputProps = {
    id: 'passwordTwo-input',
    label: t('passwordChange.inputs.passwordTwo.label'),
    variant: 'outlined',
    name: 'passwordTwo',
    type: 'password',
    placeholder: t('passwordChange.inputs.passwordTwo.placeholder'),
    register: register({
      required: t('passwordChange.inputs.error.required'),
      minLength: {
        value: 6,
        message: t('passwordChange.inputs.error.invalid')
      },
      validate: value =>
        value === getValues('passwordOne') ||
        t('passwordChange.inputs.error.incorrect')
    }),
    error: errors.passwordTwo,
    fullWidth: true
  }

  const onSubmit = data => {
    const { passwordOld, passwordOne } = data
    const messageOnSuccess = t('passwordChange.messageOnPasswordChangeSuccess')
    const messageOnError = t('passwordChange.messageOnPasswordChangeError')
    changePassword({
      email,
      passwordOld,
      passwordOne,
      setError,
      messageOnSuccess,
      messageOnError
    })
  }

  return (
    <>
      <h3>{t('passwordChange.title')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {AppInput(passwordOldInputProps)}
        {AppInput(passwordOneInputProps)}
        {AppInput(passwordTwoInputProps)}
        <ButtonWithProgress
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          text={t('passwordChange.button')}
          isLoading={isLoading}
        />

        <div className={classes.errorBar}>
          {error && <p>{t('passwordChange.formError')}</p>}
        </div>
      </form>
    </>
  )
}

function mapStateToProps(state) {
  const { isFetchingChangePasswordData } = getIsAsyncRequest(state)
  const { email } = getCurrentUser(state)
  return { isFetchingChangePasswordData, email }
}

function mapDispatchToState(dispatch) {
  return {
    changePassword: passwordData =>
      dispatch(CHANGE_USER_PASSWORD_REQUEST(passwordData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PasswordChangeForm)
