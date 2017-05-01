class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    # displays list of users
    gym_goers = current_user.ordered_json
    render json: gym_goers
  end

  def profile_load
    @user = current_user
    render :profile, layout: false
  end

  def show
    #for user profile pages
    # p params
    @user = User.find(params[:id])
    render json: {userInfo: render_to_string("users/show", :layout => false, locals: {user: @user})}
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(avatar: picture_params[:avatar])
    render :show, locals: {user: @user}
  end

  private

  def picture_params
    params.require(:user).permit(:avatar)
  end
end
