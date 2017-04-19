import injectTapEventPlugin from 'react-tap-event-plugin'
import Routes from 'routes'
import 'style.scss'

injectTapEventPlugin()
ReactDOM.render(<Routes />, document.getElementById('app'));
