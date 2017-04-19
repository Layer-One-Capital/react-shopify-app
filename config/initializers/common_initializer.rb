PR::Common.configure do |config|
  config.signup_params           = [:email, :website, :password, :anonymous]
  config.send_welcome_email      = false
  config.send_confirmation_email = false
end
