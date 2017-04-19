
import './footer.scss'
import { WWW_BASE, SUPPORT_EMAIL, COMPANY_NAME } from 'consts'

export default class Footer extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className='footer--standard'>
        <hr/>
        <p>
          {COMPANY_NAME} Copyright 2017, All Rights Reserved
        </p>
        <p className='footer--standard__links'>
          <a href={`${WWW_BASE}/terms`}>Terms & Conditions</a>
          <a href={`${WWW_BASE}/privacy`}>Privacy Policy</a>
          <a href={`${WWW_BASE}/eula`}>EULA</a>
          <a href={`mailto:${SUPPORT_EMAIL}`}>{`${SUPPORT_EMAIL}`}</a>
        </p>
      </div>
    )
  }
}
