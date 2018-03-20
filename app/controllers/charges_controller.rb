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
      @user.update(active_charge: true)
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
    price = 79.0 # TODO
    trial_days = 7 # TODO
    shop = ShopifyAPI::Shop.current
    plan = shop.plan_name
    
    if plan == 'staff_business'
      {
        name:       'TODO app charge name (Free for Shopify staff)',
        price:      price,
        trial_days: 0,
        test:       true,
        terms:      "We're pleased to offer this app free for Shopify staff",
        return_url: "#{request.base_url}#{callback_charges_path}?access_token=#{access_token}"
      }
    else
      {
        name:       'TODO app charge name',
        price:      price,
        trial_days: trial_days,
        test:       !Rails.env.production?,
        terms:      'TODO app charge terms',
        return_url: "#{request.base_url}#{callback_charges_path}?access_token=#{access_token}"
      }
    end
  end
end
