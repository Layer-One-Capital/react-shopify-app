import connectToStores from 'alt-utils/lib/connectToStores'
import { ExtendedUserActions } from 'actions'
import { ExtendedUserStore } from 'stores'
import { SimpleDialog, Loading } from 'components'
import Immutable from 'immutable'
import { API_BASE, SUPPORT_EMAIL } from 'consts'

// TODO: move to common

@connectToStores
export default class ShopifyLoginContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    authenticated: React.PropTypes.bool.isRequired
  }

  componentWillMount() {
    const token = this.props.params.token

    if (token)
      ExtendedUserActions.getCurrent(token)
    else
      this.context.router.replace('/')
  }

  componentDidUpdate() {
    if (this.props.shopifyUserFetchFailed === false && this.context.currentUser && this.context.authenticated) {
      this.context.router.replace('/dashboard')
    }
  }

  static getStores() {
    return [ExtendedUserStore]
  }

  static getPropsFromStores() {
    return ExtendedUserStore.getState()
  }

  onDialogClose() {
    window.location = `${API_BASE}/login` // Shopify base app served by Rails
  }

  render() {
    if (this.props.shopifyUserFetchFailed === true) {
      return (
        <SimpleDialog
          title='Shopify login failed'
          message={`Error: Could not log you in from Shopify. Please email ${SUPPORT_EMAIL} with this error message`}
          open={true}
          onClose={::this.onDialogClose}
        />
      )
    } else {
      return <Loading />
    }
  }
}
