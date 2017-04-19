import connectToStores from 'alt-utils/lib/connectToStores'
import { CheckActions } from 'actions'
import { CheckStore } from 'stores'
import { Authenticate } from 'common-frontend'
import Enum from 'utils/Enum'
import { API_BASE } from 'consts'

// Boilerplate: This container is responsible for what to do on authentication events

export default class AuthenticateContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object
  }
  static propTypes = {
    initialMode: React.PropTypes.number,
    location: React.PropTypes.object.isRequired,
    resetToken: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    // Boilerplate: Respond to changes in props/state to redirect etc.
    // if (this.props.checkActivated && this.props.checkActivated === true) {
    //   this.context.router.push(`/checks/${Enum.CheckTypes.seoproblems.key}`)
    // }
  }

  render() {
    return (
      <Authenticate initialMode={this.props.initialMode}
        location={this.props.location}
        onSignedUp={this.onSignedUp.bind(this)}
        resetToken={this.props.resetToken}
        onRequestShopifyAuth={this.onRequestShopifyAuth.bind(this)} />
    )
  }

  onSignedUp(params) {
    // Boilerplate: Call an action that componentDidUpdate will pick up the result of
    // CheckActions.activate(Enum.CheckTypes.seoproblems.key, Enum.CheckTypes.seoproblems.id, { url: params.website }, this.context.currentUser)
    this.context.router.push('/dashboard')
  }

  onRequestShopifyAuth() {
    window.location = `${API_BASE}/login`
  }
}
