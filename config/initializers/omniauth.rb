Rails.application.config.middleware.use OmniAuth::Builder do
  provider :shopify,
    ShopifyApp.configuration.api_key,
    ShopifyApp.configuration.secret,
    redirect_uri: Settings.api_url + '/auth/shopify/callback',
    callback_url: Settings.api_url + '/auth/shopify/callback',
    scope: ShopifyApp.configuration.scope
end
