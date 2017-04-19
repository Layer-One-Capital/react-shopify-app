
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  FontIcon,
  FlatButton,
  IconButton,
  IconMenu,
  MenuItem,
  List,
  ListItem,
  Tabs,
  Tab
} from 'material-ui'

export default class Nav extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    toolbarTitleText: React.PropTypes.string.isRequired,
    toolbarStyle: React.PropTypes.object,
    foregroundColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    leftGroupComponents: React.PropTypes.array,
    rightGroupComponents: React.PropTypes.array
  }

  static defaultProps = {
    foregroundColor: '#FAFAFA', // cannot read from context here to get the theme so hardcoding
    backgroundColor: '#0288D1'
  }

  constructor(props) {
    super(props)
  }

  render() {
    let styles = this.getStyles()

    var leftGroup = this.props.leftGroupComponents ? this.props.leftGroupComponents : []
    var rightGroup = this.props.rightGroupComponents ? this.props.rightGroupComponents : []

    // Bug prevents iconStyle from being applied: https://github.com/callemall/material-ui/issues/1663

    return (
      <Toolbar style={ this.props.toolbarStyle, { backgroundColor: this.props.backgroundColor } }>
        <ToolbarGroup key={0} className="subnav__left">
          <FontIcon onClick={ () => {
            this.context.router.goBack()
          } } style={ styles.backButton } className="material-icons">arrow_back</FontIcon>
          <ToolbarTitle className="subnav__title" style={{ color: this.props.foregroundColor }} text={ this.props.toolbarTitleText } />
          {leftGroup}
        </ToolbarGroup>
        <ToolbarGroup key={1} className="subnav__right">
          {rightGroup}
        </ToolbarGroup>
      </Toolbar>
    )
  }

  getStyles() {
    let theme = this.context.muiTheme;
    return {
      backButton: {
        marginRight: 20,
        paddingLeft: 0,
        color: this.props.foregroundColor
      }
    }
  }
}
