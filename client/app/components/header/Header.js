import { Link } from 'react-router'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'
import {Tabs, Tab} from 'material-ui/Tabs'
import { WWW_BASE, APP_NAME } from 'consts'

export default class Header extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool.isRequired,
    currentUser:   React.PropTypes.object,
    muiTheme:      React.PropTypes.object.isRequired,
    location:      React.PropTypes.object.isRequired,
    router:        React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedTabIndex: -1
    }
  }

  componentWillMount() {
    this.activateCurrentTab()
  }

  componentWillReceiveProps() {
    this.activateCurrentTab()
  }

  activateCurrentTab() {
    const path = location.pathname
    if (path.startsWith('/admin'))
      this.setState({ selectedTabIndex: 1 })
    else if (path.startsWith('/dashboard'))
      this.setState({ selectedTabIndex: 0 })
  }

  renderAuth() {
    let actions = null;
    let palette = this.context.muiTheme.palette

    if (this.context.authenticated) {

      let anonymous = this.context.currentUser.anonymous

      if (anonymous) {
        actions =
          <FlatButton key='anonsignup' label="Sign Up"
            style={{ color: palette.alternateTextColor }}
            onTouchTap={()=>{ this.context.router.push('/users/sign_up') }} />
      } else if (this.context.currentUser.provider !== 'shopify') {
        actions =
          <FlatButton key='signout' label="Sign Out"
            style={{ color: palette.alternateTextColor }}
            onTouchTap={()=>{ this.context.router.push('/users/sign_out') }} />
      }

    } else {

      actions = [
        <FlatButton key='signin' label="Sign In"
          style={{ color: palette.alternateTextColor }}
          onTouchTap={()=>{ this.context.router.push('/users/sign_in') }} />,
        <FlatButton key='signup' label="Sign Up"
          style={{ color: palette.alternateTextColor }}
          onTouchTap={()=>{ this.context.router.push('/users/sign_up') }} />
      ]
    }

    return (
      <ToolbarGroup key={1} style={{ float: 'right' }}>
        { actions }
      </ToolbarGroup>
    )
  }

  render() {
    let currentUser = this.context.currentUser
    let palette = this.context.muiTheme.palette

    let topNavTabs = null
    let topNavBurger = null

    if (this.context.authenticated) {
      let adminTab = null
      let adminMenuItem = null
      if (currentUser.admin === true) {
        adminTab = <Tab value={1}
          style={{ height: '54px', backgroundColor: palette.primary1Color }}
          label="Admin"
          onActive={ () => this.context.router.push('/admin') }
        />
        adminMenuItem = <MenuItem primaryText="Admin"
          onTouchTap={ () => this.context.router.push('/admin') }
        />
      }

      topNavBurger =
        <div id="topnavburger">
          <IconMenu iconButtonElement={<IconButton iconClassName="material-icons foreground-white" style={{ marginLeft: '-20px', top: '-4px' }}>menu</IconButton>}>
            <MenuItem primaryText="Dashboard" onTouchTap={ () => this.context.router.push('/dashboard') } />
            { adminMenuItem }
          </IconMenu>
        </div>

      topNavTabs =
        <Tabs id='topnavtabs' value={this.state.selectedTabIndex} style={{ backgroundColor: palette.primary1Color }}>
          <Tab value={0} style={{ height: '54px', backgroundColor: palette.primary1Color }} label="Dashboard" onActive={ () => this.context.router.push('/dashboard') } />
          { adminTab }
        </Tabs>
    }

    return (
      <Toolbar style={{ backgroundColor: palette.primary1Color, height: '60px' }}>
        <ToolbarGroup key={0} style={{ maxHeight: '100%' }}>
          { topNavBurger }
          <Link to="/">
            <img className="logo" alt={APP_NAME} src="../assets/images/logo.png" />
          </Link>
          { topNavTabs }
        </ToolbarGroup>
        { this.renderAuth() }
      </Toolbar>
    )
  }
}
