import { SimpleDialog } from 'components'
import { ExtendedUserActions } from 'actions'
import { SUPPORT_EMAIL } from 'consts'

// TODO: move to common

export default class ChargeContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    const events = ['succeed', 'failed', 'declined']
    const event = this.props.params.event

    this.state = {
      event,
      showModal: events.includes(event),
      message: '',
      title: '',
      actionButtonLabel: 'Close'
    }
  }

  componentWillMount() {
    if (this.state.event === 'succeed') {
      this.setState({
        title: 'Charge succeeded!',
        message: (
          <div>
            <h2>
                You&apos;ll now be taken to .......
            </h2>
          </div>
        ),
        actionButtonLabel: 'Go to .......'
      })
      ExtendedUserActions.upgradeToPlus(this.context.currentUser)
    } else if (this.state.event === 'failed') {
      this.setState({
        title: 'Upgrade failed',
        message: `An error occurred. You have not been charged. Please email ${ SUPPORT_EMAIL } with this error message`,
        actionButtonLabel: `I\'ve emailed ${ SUPPORT_EMAIL }`
      })
    } else if (this.state.event === 'declined') {
      this.setState({
        title: 'Upgrade declined',
        message: (
          <div>
            <p>Charge declined. Have any questions before upgrading? Email us at <a href={`mailto:${ SUPPORT_EMAIL }`}>{ SUPPORT_EMAIL }</a> and we&apos;ll be happy to answer them</p>
          </div>
        ),
        actionButtonLabel: 'Close'
      })
    }
    else {
      this.context.router.push('/')
    }
  }

  onDialogClose() {
    if (this.state.event === 'succeed')
      this.context.router.replace('/go-somewhere-after-the-charge-succeeds')
    else
      this.context.router.push('/')
  }

  render() {
    return (
      <SimpleDialog
        title={this.state.title}
        message={this.state.message}
        open={this.state.showModal}
        onClose={::this.onDialogClose}
        modal={true}
        actionButtonLabel={this.state.actionButtonLabel}
      />
    )
  }
}
