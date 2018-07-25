require 'sidekiq/web'

Rails.application.routes.draw do
  constraints subdomain: ['api', 'api-stage'] do
    root 'home#index'
  end

  mount ShopifyApp::Engine, at: '/'
  mount Sidekiq::Web => '/sidekiq'

  resources :unsubscribe,  only: :show
  resources :webhooks,     only: :create

  resources :charges,      only: [:create] do
    collection do
      get :callback
    end
  end

  post 'users/current'

  constraints subdomain: ['www', 'www-stage'] do
    get '/', to: 'high_voltage/pages#show', id: 'home'
  end

  # routing wasn't case sensitive in v2 but now is
  get '/Info/terms', to: redirect('/terms')
  get '/info/terms', to: redirect('/terms')
  get '/Info/privacy', to: redirect('/privacy')
  get '/info/privacy', to: redirect('/privacy')
end
