# React Shopify app

A full-featured React/Rails base app for building a Shopify app. Used and maintained by [Plug in SEO, a top-rated Shopify app](https://apps.shopify.com/plug-in-seo) with 100k users.

## Features

* Shopify authentication
* Username/password authentication
* Anonymous users: let people try out your app without creating an account
* Add other platform integrations cleanly
* Shopify charges
* Search for users by email/website/shop (useful for support teams without giving them access to your partner admin)
* Unsubscribe from email
* [Material UI](http://www.material-ui.com/#/) styling throughout React app, static pages and email templates
* Works great on mobile: responsive components, [lightweight grid](http://neat.bourbon.io/)
* Agnostic analytics tracking using [Segment](https://segment.com/)
* Static public website
* Structure for batch jobs including logging and locking
* All build and deploy scripts included: ready to run and deploy

### Why use it?

You'll have a production ready React Shopify app in no time at all! Focus on just building the features that'll get people to pay for your app.

### Why not to use?

If you want a minimal, lightweight boilerplate this is not the project you're looking for. Its aim is to support all of the pieces needed for most Shopify apps: copy, paste, configure, deploy.

But you might want to look at using just the [common](https://github.com/pemberton-rank/common) and [common frontend](https://github.com/pemberton-rank/common-frontend) package / gem instead. Or going through the code here and taking just the bits you want (with the MIT license you can do pretty much anything).

## Architecture

The [common](https://github.com/pemberton-rank/common) and [common frontend](https://github.com/pemberton-rank/common-frontend) repos contain functionality shared across all of our apps. Things that are only used by one app, stuff that doesn't make sense to have in common, and config lives in this repo.

When building a new app, simply copy this repo and then configure it.

Apps reference a specific release of common and common-frontend, making sure we can safely update new versions without breaking the others or forcing us to upgrade all of them at once.

## Getting started

Pull down the repo and create a copy. The bits you need to configure can generally be found by doing a search for 'TODO'.

Here are the files you need to edit to get your development environment going:

* /client/package.json
* /config/initializers/devise.rb
* /config/application.yml
* /config/database.yml
* /config/secrets.yml
* /config/session_store.rb
* /config/settings.yml

Then:

* ```bundle install```
* ```bundle exec rake db:setup```
* ```bundle exec rails s -p 3000``` this is the API
* ```cd client```
* ```npm install```
* ```npm start run``` the React app

Navigate to localhost:8080 and you should see the static website homepage. Try to sign up to test the React app and Rails API.

## Getting it production ready

We run staging and production environments, so you'll see code related to this. But you can go straight to production if you wish to only have one environment.

Double check these bits (you might have already edited them during dev):

* /config/schedule.rb
* /config/deploy.rb
* /client/index.template.ejs
* /client/assets/images/logo.png
* /app/controllers/charges_controller.rb
* /app/controllers/webhooks_controller.rb
* /public/favicon.ico
* /public/404.html
* /public/500.html

Then set up your configuration for the environments:

* /config/initializers/mail.rb
* /config/deploy/production.rb
* /config/deploy/staging.rb
* /config/settings/production.yml
* /config/settings/staging.yml
* /config/application.production.yml
* /config/application.staging.yml
* /config/database.production.yml
* /config/database.staging.yml

### Installing SSL Certificates
Install `cerbot` on remote server using next commands:

```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

Then obtain SSL certificates on local machine using (this can take a while due to strong DH param generation):

`bundle exec cap production ssl:setup`

Certificates will renew automatically.


## Deploying

```bundle exec cap staging deploy``` deploys master to staging
