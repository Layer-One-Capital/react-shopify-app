import { Promotion } from 'common-frontend'

export default class PromotionContainer extends React.Component {
  render() {
    return (
      <div>
        <Promotion code={this.props.params.code} />
      </div>
    )
  }
}
