class BingoController < ApplicationController
  def play
    @pictures = Dinosaur.order("RAND()").limit(10)
    @image_paths = @pictures.map(&:img) #データの順を同じにするためにpluckではくmapを使用。
    @names = @pictures.map(&:name)
    # binding.pry
    render 'bingo/play1'
    
  end
end
