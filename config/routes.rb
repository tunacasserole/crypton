 Rails.application.routes.draw do

  root to: 'welcome#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users'
  }

  resources :coins
  resources :factors
  resources :issues
  resources :blogs
  resources :users

end
