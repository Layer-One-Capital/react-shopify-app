module UrlValidator
  extend ActiveSupport::Concern
  cattr_accessor :config

  included do
    before_validation :append_http
    @@config = {} unless @@config

    def self.validate_url(*attrs)
      @@config[self.name] = { attrs: attrs }

      attrs.each do |attr|
        validates attr, format: { with: URI.regexp, message: 'Invalid Uri' }, presence: true
      end
    end
  end

  def append_http
    @@config[self.class.name][:attrs].each do |attr|
      # assume all URLs without protocol are http and prepend this
      if self[attr] && self[attr].include?('.') && !self[attr].downcase.starts_with?('http')
        self[attr].prepend('http://')
      end
    end
  end
end
