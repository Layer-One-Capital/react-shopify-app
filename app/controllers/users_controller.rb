class UsersController < BaseApiController
  def current
    render json: current_user, serializer: SessionSerializer
  end
end
