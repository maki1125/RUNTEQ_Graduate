class BingoController < ApplicationController
  def play
    @picture = Animal.order("RAND()").limit(10)
    # binding.pry
    render 'bingo/play1'
    
  end
end
