import { API_BASE } from 'consts'

export default class ChargeUtils {
  static upgrade(accessToken) {
    // hmmm...
    let form = document.createElement('form')
    form.method = 'POST'
    form.action = `${API_BASE}/charges`

    let input = document.createElement('input')
    input.type  = 'hidden'
    input.name  = 'access_token'
    input.value = accessToken
    form.appendChild(input)

    let button = document.createElement('input')
    button.setAttribute('type', 'submit')
    form.appendChild(button)

    document.getElementsByTagName('body')[0].appendChild(form) // be sure to test in Firefox, as it has quirks around dynamically created forms
    form.submit()
  }
}
