import { Router, Route, browserHistory } from 'react-router'
import { Header, CreateAnonymousUser } from 'components'
import { WWW_BASE, API_BASE } from 'consts'
import {
  UserActions,
  UserStore,
  Analytics,
  Enum
} from 'common-frontend'

import {
  AppContainer,
  AdminContainer,
  ChargeContainer,
  DashboardContainer,
  ShopifyLoginContainer,
  UnsubscribedContainer,
  AuthenticateContainer
} from './containers'

// TODO: could a lot of this code be moved to common, with the routes object passed in / merged?

export default class Routes extends React.Component {
  requireAuth(nextState, replace) {
    if (!UserStore.getState().authenticated) replace('/users/sign_in')
  }

  requireShopifyAuth(nextState, replace) {
    const shop = nextState.location.query.shop
    const { authenticated, currentUser } = UserStore.getState()

    if (!authenticated || currentUser.provider !== 'shopify' || shop !== currentUser.shop) {
      const { query } = nextState.location
      let queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

      window.location.replace(`${API_BASE}/login?${queryString}`) // Shopify login page served from the API
    }
  }

  goHomeIfAuthenticated(nextState, replace) {
    if (UserStore.getState().authenticated) replace('/dashboard')
  }

  goHomeOrToSignIn(nextState, replace) {
    if (UserStore.getState().authenticated) replace('/dashboard')
    else replace('/users/sign_in')
  }

  signOutIfSignedIn() {
    if (UserStore.getState().authenticated) UserActions.signout()
  }

  signOutAndGoToWWW() {
    if (UserStore.getState().authenticated) {
      UserActions.signout() // potential bug... what if this call doesn't complete before window.location is changed?
      window.location = WWW_BASE
    } else {
      window.location = WWW_BASE
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route component={AppContainer}>
          <Route path='/' components={{ content: null}} onEnter={::this.goHomeOrToSignIn} />
          <Route path='/dashboard' components={{ content: DashboardContainer }} onEnter={::this.requireAuth} />
          <Route path='/users/sign_in' components={{ header: null, content: (props) => (<AuthenticateContainer initialMode={Enum.authenticateMode.SignIn} location={props.location} />), footer: null }} onEnter={::Analytics.hideLiveChat} onLeave={::Analytics.showLiveChat} />
          <Route path='/users/sign_up' components={{ header: null, content: (props) => (<AuthenticateContainer initialMode={Enum.authenticateMode.SignUp} location={props.location} />), footer: null }} onEnter={::Analytics.hideLiveChat} onLeave={::Analytics.showLiveChat} />
          <Route path='/users/create_password' components={{ header: null, content: (props) => (<AuthenticateContainer initialMode={Enum.authenticateMode.ForgottenPassword} location={props.location} />), footer: null }} onEnter={::Analytics.hideLiveChat} onLeave={::Analytics.showLiveChat} />
          <Route path='/users/change_passwords/:resetToken' components={{ header: null, content: (props) => (<AuthenticateContainer initialMode={Enum.authenticateMode.ChangePassword} location={props.location} resetToken={props.params.resetToken} />), footer: null }} onEnter={::Analytics.hideLiveChat} onLeave={::Analytics.showLiveChat} />
          <Route path='/users/sign_out' components={{ content: null }} onEnter={::this.signOutAndGoToWWW} />
          <Route path='/users/anon' components={{ content: CreateAnonymousUser, footer: null }} onEnter={::this.signOutIfSignedIn} />
          <Route path='/charge/:event' components={{ content: ChargeContainer }} onEnter={::this.requireAuth} />
          <Route path='/users/sign_in/shopify/:token' components={{ header: null, content: ShopifyLoginContainer, footer: null }} onEnter={::this.signOutIfSignedIn} />
          <Route path='/unsubscribed' components={{ header: Header, nav: null, content: UnsubscribedContainer }} />
          <Route path='/admin' components={{ content: AdminContainer }} onEnter={::this.requireAuth} />
        </Route>
      </Router>
    )
  }
}
