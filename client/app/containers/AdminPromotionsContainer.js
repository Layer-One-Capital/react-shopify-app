import { AdminPromotions } from 'common-frontend'

import './adminContainer.scss'

export default class AdminPromotionsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='adminContainer__content'>
        <div className='adminContainer__content__sheet'>
          <AdminPromotions />
        </div>
      </div>
    )
  }
}
