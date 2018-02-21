class FactorsController < ApplicationController

  def index
    @factors = Factor.all
  end

  def show
  end

  def edit
  end
end

