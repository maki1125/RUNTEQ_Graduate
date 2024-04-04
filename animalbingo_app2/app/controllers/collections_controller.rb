class CollectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @animals = current_user.animals
    @animal_imgpaths = @animals.map(&:img) #データの順を同じにするためにpluckではくmapを使用。
    @animal_imgpaths << 'question101.png'
    @animal_names = @animals.map(&:name)
    # binding.pry
  end

  def show
    @animal = Animal.find(params[:id])
    # binding.pry
  end

  def save
    @bingo_save = params[:hoge]
    @animal_save = Picture.where(name: @bingo_save)
    @animal_save.each do |animal|
      current_user.pictures << animal unless current_user.pictures.exists?(name: animal.name)
    end
    # binding.pry
  end
end
