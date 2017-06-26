server 'TODO IP ADDRESS', user: 'deploy', roles: %w{web app migrate}

set :rails_env, 'TODO ENVIRONMENT NAME like staging or production'
set :whenever_environment, 'TODO ENVIRONMENT NAME like staging or production'

set :nginx_api_server_name,    'TODO api-stage.example.com'
set :nginx_app_server_name,    'TODO app-stage.example.com'
set :nginx_static_server_name, 'TODO www-stage.example.com'

# if set, nginx will be configured to 443 port and port 80 will be auto rewritten to 443
# also, on `nginx:setup`, paths to ssl certificate and key will be configured
# and certificate file and key will be copied to `/etc/ssl/certs` and `/etc/ssl/private/` directories
# default value: false
set :nginx_use_ssl, true

# if set, it will ask to upload certificates from a local path. Otherwise, it will expect
# the certificate and key defined in the next 2 variables to be already in the server.
set :nginx_upload_local_certificate, false

set :nginx_ssl_cert_location, "/etc/letsencrypt/live/"
set :nginx_ssl_cert, "fullchain.pem"
set :nginx_ssl_cert_key, "privkey.pem"
set :nginx_ssl_cert_path, "#{fetch(:nginx_ssl_cert_location)}#{fetch(:nginx_app_server_name)}/"
set :nginx_ssl_cert_key_path, "#{fetch(:nginx_ssl_cert_location)}#{fetch(:nginx_app_server_name)}/"

set :unicorn_workers, 2
set :build_prerelease, :true
set :public_host, 'TODO http://api-stage.example.com'
