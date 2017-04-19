ShopifyApp.configure do |config|
  config.api_key      = ENV['shopify_api_key']
  config.secret       = ENV['shopify_secret']
  config.scope        = 'read_products'
  config.embedded_app = true

  config.webhooks = [
    { topic: 'app/uninstalled', address: "#{Settings.api_url}/webhooks", format: 'json' },
  ]
end
