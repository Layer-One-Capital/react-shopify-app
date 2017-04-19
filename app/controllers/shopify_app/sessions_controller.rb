class ShopifyApp::SessionsController < ApplicationController
  include ShopifyApp::SessionsConcern

  def callback
    if auth_hash
      login_shop
      install_webhooks
      install_scripttags

      shop = ShopifyAPI::Shop.current
      @user = User.from_provider(
        provider: 'shopify',
        email: shop.email,
        website: params[:shop]
      )

      Analytics.track({
        user_id: @user.id,
        event: 'Logged in',
        properties: {
            'logon method': 'shopify'
        }
      })

      # Need to use Shopify app links? Take a look at the Plug in SEO code and add it to the boilerplate repo
      redirect_to "#{Settings.client_url}/users/sign_in/shopify/#{@user.access_token}"
    else
      redirect_to_with_fallback login_url
    end
  end

  protected

  # to make sure a user has a Shopify session, on a controller, use:
  #   before_action :login_shop
  def login_shop
    sess = ShopifyAPI::Session.new(shop_name, token)
    session[:shopify] = ShopifyApp::SessionRepository.store(sess)
    session[:shopify_domain] = shop_name
    ShopifyAPI::Base.activate_session(sess)
  end
end
