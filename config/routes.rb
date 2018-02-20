 Rails.application.routes.draw do

  root to: 'welcome#index'

    devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users'
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
