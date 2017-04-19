class ApplicationMailer < ActionMailer::Base
  include MailerHelpers

  helper MailerHelpers
  default from: "#{Settings.app_name} <#{Settings.support_email}>"
end
