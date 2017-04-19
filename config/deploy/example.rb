server 'TODO IP ADDRESS', user: 'deploy', roles: %w{web app migrate}

set :rails_env, 'TODO ENVIRONMENT NAME like staging or production'

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
set :nginx_upload_local_certificate, true

# remote file name of the certificate, only makes sense if `nginx_use_ssl` is set
# default value: `nginx_server_name + ".crt"`
# set :nginx_ssl_certificate, "ssl_stuff/ssl-bundle.crt"
set :nginx_ssl_certificate, "/home/deploy/.ssh/certs/#{fetch(:nginx_api_server_name)}.crt"
# set :nginx_ssl_cert_local_path, "/etc/ssl/certs/1.crt"

# remote file name of the certificate, only makes sense if `nginx_use_ssl` is set
# default value: `nginx_server_name + ".key"`
# set :nginx_ssl_certificate_key, "ssl_stuff/server.key"
set :nginx_ssl_certificate_key, "/home/deploy/.ssh/certs/#{fetch(:nginx_api_server_name)}.key"

set :unicorn_workers, 2
set :build_prerelease, :true
set :public_host, 'TODO http://api-stage.example.com'