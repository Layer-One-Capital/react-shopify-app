import alt from 'alt'
import { createActions } from 'alt-utils/lib/decorators'
import { ExtendedUserSource } from 'sources'
import { UserActions, Analytics } from 'common-frontend'

// Boilerplate: ExtendedUserActions is for 'extending' a common user for things just this app needs

@createActions(alt)
export default class ExtendedUserActions {
  constructor() {
    this.generateActions(
      'setShopifyUserFetchFailed'
    )
  }

  getCurrent(token) {
    this.setShopifyUserFetchFailed(false)
    return ExtendedUserSource.fetchCurrent(token).then(resp => {
      UserActions.setExtendedUser(resp)
    }).catch(error => {
      this.setShopifyUserFetchFailed(true)
    })
  }

  // Boilerplate example: setting other properties on a user
  activateCharge(currentUser) {
    currentUser.activeCharge = true // reflect what has happened on the server without refreshing the whole user
    UserActions.setExtendedUser(currentUser)
    return true
  }
}
