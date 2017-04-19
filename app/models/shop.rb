class Shop < ActiveRecord::Base
  include ShopifyApp::Shop
  include ShopifyApp::SessionStorage

  def public_resource_url(resource_name, handle)
    root_path = resource_name.downcase

    case root_path
      when 'customcollection', 'smartcollection'
        root_path = 'collection'
      when 'article'
        root_path = 'blog'
    end

    "http://#{shopify_domain}/#{root_path}s/#{handle}"
  end
end
