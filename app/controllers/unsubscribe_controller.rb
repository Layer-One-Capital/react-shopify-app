class UnsubscribeController < BaseApiController
  skip_before_action :authenticate_user_from_token!

  def show
    if user = User.find_by(unsubscribe_token: params[:id])
      user.update(unsubscribed: true)
      redirect_to "#{Settings.client_url}/unsubscribed"
    else
      redirect_to Settings.client_url
    end
  end
end
