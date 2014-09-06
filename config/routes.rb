Rails.application.routes.draw do

  resources :texts

  get "/" => "home#index"


end
