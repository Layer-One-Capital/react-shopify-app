class HomeController < ApplicationController
  def index
    redirect_to Settings.client_url
  end
end
