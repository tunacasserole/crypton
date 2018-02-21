class CoinsController < ApplicationController

  def show

  end

  def edit
  end

  def index
    @coins = Coin.all
  end

end

