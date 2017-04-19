class ChargesController < ApplicationController
  include ShopifyApp::LoginProtection

  before_action :login_again_if_different_shop
  around_filter :shopify_session
  before_action :find_user, :load_charge

  def create
    @recurring_application_charge.try!(:cancel)

    params = charge_params(@user.access_token)
    @charge = ShopifyAPI::RecurringApplicationCharge.new(params)

    if @charge.save
      fullpage_redirect_to @charge.confirmation_url
    else
      redirect_to "#{Settings.client_url}/charge/failed"
    end
  end

  def callback
    @charge = ShopifyAPI::RecurringApplicationCharge.find(params[:charge_id])

    if @charge.status == 'accepted'
      @charge.activate
      @user.update(plus: true)
      redirect_to "#{Settings.client_url}/charge/succeed"
    elsif @charge.status == 'declined'
      redirect_to "#{Settings.client_url}/charge/declined"
    else
      redirect_to "#{Settings.client_url}/charge/failed"
    end
  end

  private

  def find_user
    @user = User.find_by!(access_token: params[:access_token])
  end

  def load_charge
    @charge = ShopifyAPI::RecurringApplicationCharge.current
  end

  def charge_params(access_token)
    {
      name:       'TODO app charge name',
      price:      20.0, # TODO
      trial_days: 7, # TODO
      test:       !Rails.env.production?,
      terms:      'TODO app charge terms',
      return_url: "#{request.base_url}#{callback_charges_path}?access_token=#{access_token}"
    }
  end
end
