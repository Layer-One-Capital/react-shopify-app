import { ResponsiveDialog } from 'common-frontend'
import FlatButton from 'material-ui/FlatButton'

export default class SimpleDialog extends React.Component {
  static propTypes = {
    title:              React.PropTypes.string.isRequired,
    message:            React.PropTypes.string.isRequired,
    open:               React.PropTypes.bool.isRequired,
    onClose:            React.PropTypes.func,
    modal:              React.PropTypes.bool,
    actionButtonLabel:  React.PropTypes.string
  }
  static defaultProps = {
    modal:             false,
    actionButtonLabel: 'Close'
  }

  constructor(props) {
    super(props)
    this.state = { open: this.props.open }
  }

  componentDidUpdate() {
    this.state = { open: this.props.open }
  }

  handleClose() {
    this.setState({ open: false})

    if (this.props.onClose)
      this.props.onClose()
  }

  render() {
    const actions = [
      <FlatButton
        label={this.props.actionButtonLabel}
        primary={true}
        onTouchTap={::this.handleClose}
      />
    ]

    return (
      <ResponsiveDialog
        title={this.props.title}
        actions={actions}
        modal={this.props.modal}
        open={this.state.open}
        onRequestClose={::this.handleClose}
      >
        {this.props.message}
      </ResponsiveDialog>
    )
  }
}
