class SessionSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :website, :access_token, :anonymous, :provider, :shop, :created_at, :admin, :active_charge

  def shop
    if object && object.shop
      object.shop.shopify_domain
    else
      nil
    end
  end
end
