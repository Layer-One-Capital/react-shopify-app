import alt from 'alt'
import { createStore, bind } from 'alt-utils/lib/decorators'
import { ExtendedUserActions } from 'actions'

// Boilerplate: ExtendedUserActions is for 'extending' a common user for things just this app needs

@createStore(alt)
export default class ExtendedUserStore {
  constructor() {
    this.state = {
      shopifyUserFetchFailed: false
    }
    this.bindActions(ExtendedUserActions)
  }

  static displayName = 'ExtendedUserStore'

  setShopifyUserFetchFailed(shopifyUserFetchFailed) {
    this.setState({ shopifyUserFetchFailed })
  }
}
