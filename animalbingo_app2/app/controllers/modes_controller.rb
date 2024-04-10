class ModesController < ApplicationController
  def select; end

  # モード選択押した時に新規か更新かわからないため条件分岐を設ける
  def new
    if current_user.mode==nil
      @mode = Mode.new
      #binding.pry
    else
      @mode = current_user.mode
      #binding.pry
    end
    #binding.pry
  end

  def create
    @mode = Mode.create(mode_params)
    @mode.user_id = current_user.id
    #binding.pry
    if @mode.save
      # 保存成功時の処理
      redirect_to bingo_path
    else
      # 保存失敗時の処理
      render :new
    end
    
  end

  def update
    @mode = current_user.mode
    #binding.pry
    if @mode.update(mode_params)
      #binding.pry
      # 保存成功時の処理
      redirect_to bingo_path
    else
      # 保存失敗時の処理
      render :new
    end
  end

  private
  def mode_params
    params.require(:mode).permit(:play_mode, :picture_mode, :level_mode)
  end
end
