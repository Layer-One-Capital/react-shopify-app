class User < ApplicationRecord
  include PR::Common::Tokenable
  include UrlValidator

  has_many :application_charges

  enum provider: { shopify: 0 } # null: username/password

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  validate_url :website
  validates :username, uniqueness: true, presence: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                              message: 'Invalid Email address' }
  before_validation :append_username
  before_create     :append_unsubscribe_hash

  # can't unfortunately put this as a has_one because ShopifyApp::SessionsController creates the Shop before a User
  def shop
    unless self.shopify?
      nil
    else
      unless self.shop_id
        domain = self.username.dup
        domain.slice!('shopify-')
        shop = Shop.find_by(shopify_domain: domain)
        self.shop_id = shop.id
        self.save!
      end

      Shop.find_by(id: self.shop_id)
    end
  end

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def self.from_provider(attrs)
    if user = User.find_by(username: "#{attrs[:provider]}-#{attrs[:website]}", provider: attrs[:provider])
      Analytics.identify({
        user_id: user.id,
        traits: {
          primaryDomain:  attrs[:website],
          email:          attrs[:email],
          product:        'Shopify',
          username:       user.username
        }
      })

      return user
    else
      shop = Shop.find_by(shopify_domain: attrs[:website])
      created_user = create(
        username: "#{attrs[:provider]}-#{attrs[:website]}",
        password: SecureRandom.hex,
        provider: attrs[:provider],
        website:  attrs[:website],
        shop_id:  shop.id,
        email:    attrs[:email]
      )

      Analytics.identify({
        user_id: created_user.id,
        traits: {
          primaryDomain:  attrs[:website],
          email:          attrs[:email],
          product:        'Shopify',
          username:       created_user.username
        }
      })

      Analytics.track({
        user_id: created_user.id,
        event: 'Registered',
        properties: {
          'registration method': 'shopify'
        }
      })

      return created_user
    end
  end

  private

  def append_username
    self.username = "anonymous_#{Time.now.to_i}#{rand(100)}" unless username.present?
  end

  def append_unsubscribe_hash
    self.unsubscribe_token = SecureRandom.hex
  end
end
