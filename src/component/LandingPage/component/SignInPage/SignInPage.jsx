import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../../shared/component/ButtonWithProgress'
import HBTextField from '../../../../shared/component/HBTextField'
import { loginRequest } from '../../../AccountProfile/action/accountProfileActions'
import { selectIsAsyncRequest } from '../../../../shared/selector/appSelectors'

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
    const messageOnError = t('login.signInPage.messageOnLogInError')
    login({ email, password, setError, messageOnError })
  }

  const emailInputProps = {
    id: 'email-input',
    label: t('login.signInPage.inputs.email.label'),
    variant: 'outlined',
    name: 'email',
    type: 'text',
    placeholder: t('login.signInPage.inputs.email.placeholder'),
    register: register({
      required: t('login.signInPage.inputs.email.error.required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('login.signInPage.inputs.email.error.invalidPattern')
      }
    }),
    error: errors.email,
    fullWidth: true
  }

  const passwordInputProps = {
    id: 'password-input',
    label: t('login.signInPage.inputs.password.label'),
    variant: 'outlined',
    name: 'password',
    type: 'password',
    placeholder: t('login.isignInPage.inputs.password.placeholder'),
    register: register({
      required: t('login.signInPage.inputs.password.error.required'),
      minLength: {
        value: 6,
        message: t('login.signInPage.inputs.password.error.invalid')
      }
    }),
    error: errors.password,
    fullWidth: true
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        {HBTextField(emailInputProps)}
        {HBTextField(passwordInputProps)}
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          isLoading={isLoading}
          text={t('login.signInPage.button')}
        />
        <div className={classes.errorBar}>
          {error && <p>{t('login.signInPage.formError')}</p>}
        </div>
      </form>
    </section>
  )
}

function mapStateToProps(state) {
  const { isFetchingLoginData } = selectIsAsyncRequest(state)
  return { isFetchingLoginData }
}

function mapDispatchToState(dispatch) {
  return {
    login: loginData => dispatch(loginRequest(loginData))
  }
}

const SignInForm = connect(mapStateToProps, mapDispatchToState)(SignInFormBase)

export default SignInForm
