source 'https://rubygems.org'

gem 'rails', '~> 5.1.0'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'rack-cors'
gem 'devise'
gem 'jwt'
gem 'pr-common', git: 'https://github.com/pemberton-rank/common.git', tag: 'v0.1.11' # :path => '../common'
gem 'active_model_serializers', '~> 0.10.0'
gem 'httparty'
gem 'shopify_app', '~> 7.2.0'
gem 'shopify_api', '~> 4.9.0'
gem 'activeresource', github: 'rails/activeresource'
gem 'sidekiq'
gem 'whenever', require: false
gem 'config'
gem 'open_uri_redirections'
gem 'high_voltage', '~> 3.0.0'
gem 'liquid'
gem 'analytics-ruby', '~> 2.0.0', require: 'segment/analytics'
gem 'activesupport'
gem 'premailer-rails'
gem 'rollbar'

# environment variables on staging/production
gem 'figaro'

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'better_errors'
  gem 'letter_opener'
  gem 'foreman'
  gem 'capistrano', '~> 3.6'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rbenv', '~> 2.0'
  gem 'capistrano-upload-config'
  gem 'capistrano-logrotate', github: 'pemberton-rank/capistrano-logrotate'
  gem 'capistrano-unicorn-nginx', '~> 4.0.0'
end

group :development, :test do
  gem 'sqlite3'
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_girl_rails'
  #gem 'pry-byebug'
  gem 'pry-rails'
  gem 'byebug'
  gem 'timecop'
end

group :production, :staging do
  gem 'unicorn'
end

group :test do
  gem 'shoulda-matchers'
  gem 'webmock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
