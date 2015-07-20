class Communities::MembersController < ApplicationController
  def index
    @community = Community.find params[:community_id]
    @members = @community.users
    @notices = @community.notifications
  end
end
