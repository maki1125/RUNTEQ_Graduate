class CollectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    #現在のモードで最初の表示のコレクション一覧を変化させる。
    @mode = current_user.mode 
    #初回ログインの場合モード選択未定のため
    if @mode.nil?
      @favorite_btn = 1
    else
      @favorite_btn = @mode.picture_mode
    end
    #選択絵柄ごとの処理
    case @favorite_btn
    when 1 #"どうぶつ"
      @favorite_btn="どうぶつ"
    when 2 #さかな
      @favorite_btn="さかな"
    when 3 #きょうりゅう
      @favorite_btn="きょうりゅう"
    end

    #すべての絵柄のコレクションデータを準備
    #1.動物
    @allanimal = Animal.all
    @colanimal = current_user.animals
    @allanimal_img = @allanimal.map(&:img)
    @colanimal_img = @colanimal.map(&:img) #データの順を同じにするためにpluckではくmapを使用。
    #2.魚
    @allfish = Fish.all
    @colfish = current_user.fishes
    @allfish_img =  @allfish.map(&:img)
    @colfish_img = @colfish.map(&:img) #データの順を同じにするためにpluckではくmapを使用。
    #3.恐竜
    @alldinosaur = Dinosaur.all
    @coldinosaur = current_user.dinosaurs
    @alldinosaur_img =  @alldinosaur.map(&:img)
    @coldinosaur_img = @coldinosaur.map(&:img) #データの順を同じにするためにpluckではくmapを使用。
    #はてなマーク
    @question_img = 'question101.png'
  end

  def show
    pic = params[:pic]
    case pic
    when "どうぶつ"
      @animal = Animal.offset(params[:id].to_i - 1).first #pictureのIDは項目関係なく連番でつけられているため、offset使用してそれぞれの項目の何番目のデータを持ってくるというようにしている。
    when "さかな"
      @animal = Fish.offset(params[:id].to_i - 1).first
    when "きょうりゅう"
      @animal = Dinosaur.offset(params[:id].to_i - 1).first
      # binding.pry
    end
  end

  def save
    @bingo_save = params[:hoge]
    @animal_save = Picture.where(name: @bingo_save)
    @animal_save.each do |animal|
      current_user.pictures << animal unless current_user.pictures.exists?(name: animal.name)
      #binding.pry
    end
    #binding.pry
  end
end
