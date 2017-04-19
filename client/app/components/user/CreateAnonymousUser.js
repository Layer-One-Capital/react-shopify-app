import { UserActions } from 'common-frontend'
import { Loading, Nav } from 'components'
import Helmet from 'react-helmet'
import { APP_NAME } from 'consts'

// TODO: move to common

// This component is used by www to create an anonymous user and then redirect them to the SEO problems check for the URL they've entered
// Like: GET http://app.pluginseo.local:8080/users/anon?url=microsoft.com
export default class CreateAnonymousUser extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    UserActions.signup({
      anonymous: true,
      website: this.props.location.query.url
    }, () => { this.context.router.replace('/url-to-go-to-after-signup-boilerplate') })
  }

  render() {
    return (
      <div className="create-anonymous-user">
        <Helmet title='Use the same page title as the target redirect page here to appear smooth...' />
        <Nav toolbarTitleText='Use the same title text as the target redirect page here to appear smooth...' />
        <Loading />
      </div>
    )
  }
}
