Rails.application.routes.draw do

  resources :texts

  get "/" => "home#index"

  get "/confirmation" => "texts#confirmation"

end
