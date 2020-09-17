import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { makeServer } from '../../mirage-server'
import { StateProvider } from '../store/stateProvider'
import { ApolloProvider } from '@apollo/client'
import * as store from '../store/store'
import Authenticator from '../components/Authenticator/Authenticator'
import { client } from '@island.is/service-portal/graphql'
import Dashboard from '../screens/Dashboard/Dashboard'
import Layout from '../components/Layout/Layout'
import Modules from '../screens/Modules/Modules'
import * as styles from './App.treat'
import OidcSignIn from '../components/Authenticator/OidcSignIn'
import OidcSilentSignIn from '../components/Authenticator/OidcSilentSignIn'
import { ServicePortalPath } from '@island.is/service-portal/core'
import './App.css'

export const App = () => {
  makeServer()
  return (
    <div className={styles.page}>
      <Router>
        <ApolloProvider client={client}>
          <StateProvider
            initialState={store.initialState}
            reducer={store.reducer}
          >
            <Switch>
              <Route
                exact
                path={ServicePortalPath.MinarSidurSignInOidc}
                component={OidcSignIn}
              />
              <Route
                exact
                path={ServicePortalPath.MinarSidurSilentSignInOidc}
                component={OidcSilentSignIn}
              />
              <Route>
                <Authenticator>
                  <Layout>
                    <Switch>
                      <Route exact path={ServicePortalPath.MinarSidurRoot}>
                        <Dashboard />
                      </Route>
                      <Route>
                        <Modules />
                      </Route>
                    </Switch>
                  </Layout>
                </Authenticator>
              </Route>
            </Switch>
          </StateProvider>
        </ApolloProvider>
      </Router>
    </div>
  )
}

export default App
