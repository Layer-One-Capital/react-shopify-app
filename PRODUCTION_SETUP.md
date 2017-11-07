## Getting access to the server

1. Create keypair file in AWS console or ask from a colleague developer.
2. Move keypair file `***.pem` to ~/.ssh/ folder
3. Run `chmod 400 ~/.ssh/***.pem` so that only you can have access to the file
4. Open `~/ssh/config` and add following text to that:
```
Host 1.1.1.1 # IP of your EC2 instance
User deploy
IdentityFile ~/.ssh/***.pem # keypair file name
ControlMaster auto
ForwardAgent yes
```

Add your public key to Git system you are using. To get public key from private key run `ssh-keygen -y -f ~/.ssh/***.pem`.
Then run from within project folder

```
ssh-add ~/.ssh/***.pem
```

You should run this if you have problems with accessing git.

5. Now you can connect with command `ssh ubuntu@1.1.1.1`


## Setting up EC2 instance from scratch

1. Connect to EC2 instance as root user using `ssh ubuntu@1.1.1.1`
2. Install software
```
sudo apt-get update
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev runit emacs libpq-dev nginx nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

3. Add `deploy` user
```
sudo adduser deploy
sudo passwd -l deploy
```

4. Add `deploy` user to sudoers file so it can make some capistrano commands without prompt.
```
sudo visudo
```

Add deploy user under root, then to exit vim and save - hit Ctrl+X, then Y, Enter.
```
root    ALL=(ALL:ALL) ALL
deploy    ALL=(ALL:ALL) NOPASSWD:ALL
```

4.1 Switch to `deploy` user and install ruby for `deploy` user

```
sudo su - deploy

git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
rbenv install 2.3.0 # Your ruby version
rbenv global 2.3.0

echo "gem: --no-document" > ~/.gemrc
gem install bundler
```

4.2 Create folder for app
```
sudo mkdir /srv/your_app_name
sudo chown deploy /srv/your_app_name
```


5. Copy ssh keys, so you can `ssh` under that user.

```
mkdir .ssh
sudo cp /home/ubuntu/.ssh/authorized_keys ~/.ssh/
sudo chown deploy ~/.ssh/authorized_keys
```

Now you, and capistrano, can ssh into server under `deploy` user with a `ssh deploy@1.1.1.1` command.

5.1 Run next commands:
```
sudo mkdir /etc/nginx/ssl/
sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 4096
sudo rm /etc/nginx/sites-enabled/default
bundle config github.https true
```

6. Fill next files:
```
config/application.production.yml # Do not commit this file into git
config/database.production.yml # Do not commit this file into git
config/deploy/production.rb
```

7. Exit from server. Edit your `config/deploy/***.rb` capistrano file to disable SSL for a while.
```
set :nginx_use_ssl, false
```

Next, run several capistrano commands on your local machine from within rails project directory.
If you get `You are trying to install in deployment mode after changing
your Gemfile. Run bundle install elsewhere and add the
updated Gemfile.lock to version control.` error, just run `bundle config github.https true` as `deploy` user on remote server.

```
bundle exec cap production setup
git add .
git commit -m 'Deploy'
git push origin master
bundle exec cap production deploy
```


8. Run this commands on server to handle SSL encryption
```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx

sudo certbot certonly --nginx -d www.your_domain.com -d api.your_domain.com -d app.your_domain.com
```


9. Exit from server. Edit your `config/deploy/***.rb` capistrano file to enable SSL back.
```
set :nginx_use_ssl, true
```

And provision server
```
bundle exec cap production setup nginx:reload
```

10. Setup logrotate

Run

```
bundle exec cap production logrotate:config
```

### Congratulations 🎉, you're done!
