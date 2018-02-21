class BlogsController < ApplicationController

  def index
    @blogs = Blog.all
  end

  def show
  end

  def edit
  end
end

