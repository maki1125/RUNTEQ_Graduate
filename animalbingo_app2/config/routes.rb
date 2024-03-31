Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "static_pages#top" #トップページ

  get "bingo" => "bingo#play" #ビンゴページ

  resources :contacts, only: [:new, :create] #お問い合わせ

  #ログイン関係
  get 'login', to: 'user_sessions#new' 
  post 'login', to: 'user_sessions#create' 
  delete 'logout', to: 'user_sessions#destroy' 

  #ユーザー登録
  resources :users, only: %i[new create]

  #コレクション
  resources :collections, only: %i[index show]

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
end
