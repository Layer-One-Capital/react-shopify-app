import { SUPPORT_EMAIL } from 'consts'
import { Charge } from 'common-frontend'

export default class ChargeContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    const event = this.props.params.event

    this.state = { event }
  }

  onDialogClose() {
    if (this.state.event === 'succeed')
      this.context.router.replace('/go-somewhere-after-the-charge-succeeds')
    else
      this.context.router.push('/')
  }

  render() {
    return (
      <Charge
        onClose={::this.onDialogClose}
        event={this.props.params.event}
        supportEmail={SUPPORT_EMAIL}
        successDestiny="......"
      />
    )
  }
}
