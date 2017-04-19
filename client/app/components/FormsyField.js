import { Form, Decorator as FormsyElement } from 'formsy-react'
import { TextField } from 'material-ui'

@FormsyElement()
export default class FormsyField extends React.Component {
  mixins: [Formsy.Mixin]

  changeValue(event) {
    this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  }

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');

    const errorMessage = this.props.getErrorMessage();

    return (
      <div className={className}>
        { this.props.title &&
          <div>
            <label htmlFor={this.props.name}>{this.props.title}</label>
          </div>
        }
        <TextField
          hintText={this.props.hint}
          floatingLabelText={this.props.floatingLabelText}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={::this.changeValue}
          value={this.props.getValue()}
          checked={this.props.type === 'checkbox' && this.props.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    )
  }
}
