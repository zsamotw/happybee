import React from 'react'
import { useTranslation } from 'react-i18next'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import SignInForm from './component/SignInPage'
import SignUpForm from './component/SignUpPage'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`welcome-page-tabpanel-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

const LandingPage = () => {
  const [value, setValue] = React.useState(0)
  const { t } = useTranslation('common')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <section>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h1
            style={{
              fontFamily: 'Kalam',
              fontSize: '24px',
              fontWeight: '700',
              textTransform: 'uppercase',
              paddingLeft: '2rem'
            }}
          >
            {t('login.landingPage.appTitle')}
          </h1>
        </Grid>
        <Grid item xs={2} md={4} lg={7} />
        <Grid item xs={8} md={4} lg={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ marginBottom: '2rem' }}
          >
            <Tab label={t('login.landingPage.tab.signIn')} />
            <Tab label={t('login.landingPage.tab.signUp')} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SignInForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUpForm />
          </TabPanel>
        </Grid>
      </Grid>
    </section>
  )
}

export default LandingPage
