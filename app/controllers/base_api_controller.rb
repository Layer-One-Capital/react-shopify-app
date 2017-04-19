class BaseApiController < ActionController::API
  include PR::Common::TokenAuthenticable

  protected

  def login_shop
    shop = current_user.shop
    shop_name = shop.shopify_domain
    sess = ShopifyAPI::Session.new(shop_name, shop.shopify_token)
    session[:shopify] = ShopifyApp::SessionRepository.store(sess)
    session[:shopify_domain] = shop_name
    ShopifyAPI::Base.activate_session(sess)
  end
end
