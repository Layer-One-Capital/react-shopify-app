import LinearProgress from 'material-ui/LinearProgress'
import Helmet from 'react-helmet'

import { APP_NAME } from 'consts'

export default class Loading extends React.Component {
  static propTypes = {
    wait: React.PropTypes.number.isRequired
  }
  static defaultProps = {
    wait: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      timeout: null
    }
  }

  componentWillMount() {
    const that = this
    const timeout = setTimeout(function() {
        that.unhide()
    }, that.props.wait)
    this.setState({ timeout })
  }

  componentWillUnmount() {
    if (this.state.timeout !== null) {
      clearTimeout(this.state.timeout)
    }
  }

  unhide() {
    this.setState({ visible: true })
  }

  render() {
    return (
      <div>
        <Helmet title={`${ APP_NAME } - Loading...`} />
        { this.state.visible &&
          <LinearProgress mode="indeterminate" />
        }
      </div>
    )
  }
}
