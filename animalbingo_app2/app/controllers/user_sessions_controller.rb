class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[create new]

  def new
    @alluser=User.all.count
    # flash[:notice] = "コレクションへのアクセスにはログインが必要です"
  end

  def create
    @user = login(params[:email], params[:password]) #emailとpasswordが一致していれば@userにデータが代入される(loginメソッドで検証を行なっている)
    if @user #訳：loginメソッドで検証が一致して、@userにデータだ代入されたら
      # binding.pry
      redirect_to bingo_path #ログインしたらroot_path(root toなどで指定したページ)にリダイレクトする。
    else
      render :new #ログイン出来なかったら、ログインページ（'user_sessions#new'）にリダイレクトされる
    end
  end

  def destroy
    @mode = current_user.mode
    if @mode.nil?
    else
      @mode.destroy
    end
    logout
    flash[:success]="ログアウトしました"
    # binding.pry
    redirect_to root_path , status: :see_other #リダイレクト先をログイン画面に指定する
  end
end
