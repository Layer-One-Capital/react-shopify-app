class NewUserMailer < ApplicationMailer
  layout 'base_email_template'

  def new_password(user)
    @product_name = Settings.app_name
    @logo = "<a href='#{Settings.client_url}?utm_source=base-template&amp;utm_medium=email&amp;utm_campaign=logo'>
              <img style='padding-left:15px;width:140px;height:32px;' height='32px' width='140px' src='#{Settings.client_url}/assets/images/logo.png'>
             </a>"
    @show_unsubscribe = false
    subject = 'Create a new password'

    @provider = user.provider
    if user.provider != 'shopify'
      raw, enc = Devise.token_generator.generate(user.class, :reset_password_token)
      user.reset_password_token   = enc
      user.reset_password_sent_at = Time.now.utc
      user.save(validate: false)

      @token = raw
      password_reset_url = "#{Settings.client_url}/users/change_passwords/#{@token}"

      @username = user.email
      @password_reset_url = password_reset_url
    end

    # Sendgrid header
    headers['X-SMTPAPI'] = '{"category": ["PasswordReset"]}'

    mail subject: subject, to: user.email, template_name: 'new_password' # so we can use a single template for the new_password_duplicate_emails method
  end

  def new_password_duplicate_emails(users)
    if users.exists?(provider: nil)
      username_password_users = users.where(provider: nil)
      if username_password_users.count == 1
        new_password(username_password_users[0]) # only one username/password user, other users have this email but use different providers
      else
        raise 'Error: Cannot create new password as multiple username password users have the same email address'
      end
    else
      new_password(users[0]) # arbritarily select one because there are no username/password users matching this email
    end
  end
end
