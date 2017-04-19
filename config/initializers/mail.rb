if Rails.env.staging? || Rails.env.production?
  ActionMailer::Base.smtp_settings = {
    :address        => 'TODO smtp.sendgrid.net',
    :port           => 'TODO 587',
    :authentication => :plain,
    :enable_starttls_auto => true,
    :user_name      => ENV['email_username'],
    :password       => ENV['email_password'],
    :domain         => 'TODO https://www.example.com'
  }
  ActionMailer::Base.delivery_method ||= :smtp
end