class CollectionsController < ApplicationController
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
end
