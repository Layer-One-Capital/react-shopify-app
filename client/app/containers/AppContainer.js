import 'babel-polyfill'
import connectToStores from 'alt-utils/lib/connectToStores'
import { ExtendedUserActions } from 'actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from '../theme'
import { UserStore, Analytics } from 'common-frontend'
import { Header, Footer } from 'components'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { WWW_BASE, APP_NAME } from 'consts'

import './appContainer.scss'

// TODO: move to common

@connectToStores
export default class AppContainer extends React.Component {
  static childContextTypes = {
    authenticated: React.PropTypes.bool,
    currentUser: React.PropTypes.object
  }

  getChildContext() {
    return {
      authenticated: this.props.authenticated,
      currentUser: this.props.currentUser
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    header: React.PropTypes.object,
    nav: React.PropTypes.object,
    content: React.PropTypes.object.isRequired,
    footer: React.PropTypes.object
  }

  static defaultProps = {
    header: <Header />,
    footer: <Footer />
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.authenticated)
      ExtendedUserActions.getCurrent(this.props.currentUser.accessToken)

    this.analyticsPageView(this.props.location.pathname, this.props.location.search)
  }

  componentDidUpdate(prevProps) {
    // do this after update to pick up new page title from Helmet
    this.analyticsPageView(this.props.location.pathname, this.props.location.search)
  }

  // This component is the router root component, so receives new props whenever navigating
  analyticsPageView(pathname, search) {
    Analytics.page({
      path: pathname,
      search: search
    })
  }

  static getStores() {
    return [UserStore]
  }

  static getPropsFromStores() {
    return UserStore.getState()
  }

  render() {
    let header = this.props.header === null ? null : <header>{ this.props.header }</header>
    let nav = this.props.nav === null ? null : <nav>{ this.props.nav }</nav>
    let footer = this.props.footer === null ? null : <footer className='footer'>{ this.props.footer }</footer>

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <Helmet title={APP_NAME} />
          { header }
          { nav }
          <section className='content'>
            { this.props.content }
          </section>
          { footer }
        </div>
    </MuiThemeProvider>
    )
  }
}
