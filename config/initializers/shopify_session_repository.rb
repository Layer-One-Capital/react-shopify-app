if Rails.configuration.cache_classes
  ShopifyApp::SessionRepository.storage = Shop
else
  ActiveSupport::Reloader.to_prepare do
    ShopifyApp::SessionRepository.storage = Shop
  end
end
