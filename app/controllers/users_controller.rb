class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    # displays list of users
    gym_goers = current_user.ordered_json
    render json: gym_goers
  end

  def profile_load
    @user = current_user
    p "hello"
  end

  def show
    #for user profile pages
    # p params
    @user = User.find(params[:id])
    render json: {userInfo: render_to_string("users/show", :layout => false, locals: {user: @user})}
  end


  def profile_save
  end

end
