import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getIsAsyncRequest } from '../../../store/selectors'
import { LOGIN_REQUEST } from '../../../store/actions/async-actions'
import AppInput from '../../../components/AppInput'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const SignInFormBase = props => {
  const { isFetchingLoginData, login } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '', password: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingLoginData)
  }, [isFetchingLoginData])

  const onSubmit = data => {
    const { email, password } = data
    const messageOnError = t('signInPage.messageOnLogInError')
    login({ email, password, setError, messageOnError })
  }

  const emailInputProps = {
    id: 'email-input',
    label: t('signInPage.inputs.email.label'),
    variant: 'outlined',
    name: 'email',
    type: 'text',
    placeholder: t('signInPage.inputs.email.placeholder'),
    register: register({
      required: t('signInPage.inputs.email.error.required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('signInPage.inputs.email.error.invalidPattern')
      }
    }),
    error: errors.email,
    fullWidth: true
  }

  const passwordInputProps = {
    id: 'password-input',
    label: t('signInPage.inputs.password.label'),
    variant: 'outlined',
    name: 'password',
    type: 'password',
    placeholder: t('signInPage.inputs.password.placeholder'),
    register: register({
      required: t('signInPage.inputs.password.error.required'),
      minLength: {
        value: 6,
        message: t('signInPage.inputs.password.error.invalid')
      }
    }),
    error: errors.password,
    fullWidth: true
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AppInput(emailInputProps)}
      {AppInput(passwordInputProps)}
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        isLoading={isLoading}
        text={t('signInPage.button')}
      />
      <div className={classes.errorBar}>
        {error && <p>{t('signInPage.formError')}</p>}
      </div>
    </form>
  )
}

function mapStateToProps(state) {
  const { isFetchingLoginData } = getIsAsyncRequest(state)
  return { isFetchingLoginData }
}

function mapDispatchToState(dispatch) {
  return {
    login: loginData => dispatch(LOGIN_REQUEST(loginData))
  }
}

const SignInForm = connect(mapStateToProps, mapDispatchToState)(SignInFormBase)

export default SignInForm
