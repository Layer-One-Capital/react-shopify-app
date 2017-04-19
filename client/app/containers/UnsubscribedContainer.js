import { SimpleDialog } from 'components'

// TODO: move to common

export default class UnsubscribedContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showModal: true,
      actionButtonLabel: 'close'
    }
  }

  onDialogClose() {
    this.context.router.push('/')
  }

  render() {
    return (
      <SimpleDialog
        title='Unsubscribed'
        message='You have successfully unsubscribed'
        open={this.state.showModal}
        onClose={::this.onDialogClose}
        modal={true}
        actionButtonLabel={this.state.actionButtonLabel}
      />
    )
  }
}
