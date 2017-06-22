# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'capistrano'
set :repo_url, 'TODO your repo URL'

# Default branch is :master
set :branch, ENV['BRANCH'] || 'master'
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, 'TODO /srv/YOUR_APP_NAME'

set :migration_role, 'migrate'


set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.3.0'

# in case you want to set ruby version from the file:
# set :rbenv_ruby, File.read('.ruby-version').strip

set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all # default value

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
#set :linked_files, %w{config/database.yml config/redis.yml}
set :linked_files, %w{config/database.yml config/application.yml config/secrets.yml}

# Default value for linked_dirs is []
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle client/node_modules}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 2
set :keep_releases, 2

# set :rvm1_ruby_version, "2.3.0"
# set :rvm1_auto_script_path, '/tmp/pluginseo'

set :sidekiq_queue, %w(default mailer)
# before 'deploy', 'rvm1:install:ruby'

set :app_subdir, 'rails'

#SSHKit.config.command_map.prefix[:bundle].push "rails"
#SSHKit.config.command_map.prefix[:rake].push "rails"

before 'deploy:check:linked_files', 'config:push'

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  task :build_client do
    on roles(:app) do
      within "#{release_path}/client" do
        with build_prerelease: fetch(:build_prerelease), build_release: fetch(:build_release), public_host: fetch(:public_host) do
          execute :ls, "-l"
          execute :npm, 'install'
          execute :npm, 'run build'
        end
      end
    end
  end

  after 'deploy:updated', 'deploy:build_client'

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  desc "reload the database with seed data"
  task :seed do
    on roles(:app) do
      execute "cd #{release_path} && /home/deploy/.rbenv/shims/bundle exec rails db:seed RAILS_ENV=#{fetch(:stage)}"
    end
  end

  after 'deploy:migrate', 'deploy:seed'

  after :finishing, :tag_and_push_tag do
    on roles(:app) do
      within release_path do
        set(:current_revision, capture(:cat, 'REVISION'))

        # release path may be resolved already or not
        resolved_release_path = capture(:pwd, "-P")
        set(:release_name, resolved_release_path.split('/').last)
      end
    end

    run_locally do
      user = capture(:git, "config --get user.name")
      email = capture(:git, "config --get user.email")
      tag_msg = "Deployed by #{user} <#{email}> to #{fetch :stage} as #{fetch :release_name}"

      tag_name = "#{fetch :stage }-#{fetch :release_name}"
      execute :git, %(tag #{tag_name} #{fetch :current_revision} -m "#{tag_msg}")
      execute :git, "push --tags origin"
    end
  end
end

namespace :rails do
  desc 'Open a rails console `cap [staging] rails:console [server_index default: 0]`'
  task :console do
    on roles(:app) do |server|
      server_index = ARGV[2].to_i

      return if server != roles(:app)[server_index]

      puts "Opening a console on: #{host}...."

      cmd = "ssh #{server.user}@#{host} -t 'cd #{fetch(:deploy_to)}/current && RAILS_ENV=#{fetch(:stage)} /home/deploy/.rbenv/shims/bundle exec rails console'"

      puts cmd

      exec cmd
    end
  end
end

namespace :unicorn do
  # we have to override the existing unicorn:restart command as the version of
  # service on the server calls first stop and then immediately start instead
  # of calling restart.
  Rake::Task['restart'].clear_actions
  desc 'restart unicorn'
  task :restart do
    on roles(:app) do
      execute "/etc/init.d/unicorn_capistrano_#{fetch(:stage)} restart"
    end
  end
#   before :restart, 'rvm1:hook'
end

set :whenever_environment, fetch(:stage)
set :whenever_command, [:bundle, :exec, :whenever]
set :whenever_roles, [:app, :db]
set :whenever_command_environment_variables, ->{ {} }
set :whenever_identifier,   ->{ fetch :application }
set :whenever_variables,    ->{ "environment=#{fetch :whenever_environment}" }
set :whenever_update_flags, ->{ "--update-crontab #{fetch :whenever_identifier} --set #{fetch :whenever_variables}" }
set :whenever_clear_flags,  ->{ "--clear-crontab #{fetch :whenever_identifier}" }

# require "whenever/capistrano"

namespace :ssl do
  desc 'Get certificates'
  task :setup do
    on roles(:app) do
      rails_server_names = [fetch(:nginx_api_server_name), fetch(:nginx_static_server_name)].compact.map {|n| "-d #{n}"}.join(' ')
      execute "sudo mkdir /etc/nginx/ssl/"
      execute "sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048"
      execute  "TODO sudo certbot certonly --webroot --webroot-path=/srv/YOUR_APP_NAME/current/public #{rails_server_names}"
      execute  "TODO sudo certbot certonly --webroot --webroot-path=/srv/YOUR_APP_NAME/current/client -d #{fetch(:nginx_app_server_name)}"
    end
  end
end
