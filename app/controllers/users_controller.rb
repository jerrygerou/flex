class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.search(params[:search])
  end

end
