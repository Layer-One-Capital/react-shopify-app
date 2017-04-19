module MailerHelpers
  def frontend_url(path = '')
    url_options = Rails.configuration.action_mailer.default_url_options
    scheme = Rails.env.staging? || Rails.env.production? ? 'https' : 'http'
    "#{scheme}://#{url_options[:frontend_host]}#{url_options[:frontend_port] && url_options[:frontend_port].to_s != '80' ? ":#{url_options[:frontend_port]}" : '' }#{url_options[:frontend_path] || '/'}\##{path}"
  end

  def prevent_auto_url_linking(string)
    string.split('.').join('.&#8203;')
  end
end
