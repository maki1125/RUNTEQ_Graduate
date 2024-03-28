class BingoController < ApplicationController
  def play
    @pictures = Animal.order("RAND()").limit(10)
    @image_paths = @pictures.pluck(:img)
    # binding.pry
    render 'bingo/play1'
    
  end
end
