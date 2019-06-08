class Api::MessagesController < ApplicationController
  before_action :set_group
  def index
    respond_to do |format|
      format.html
      format.json {@new_messages = Message.where(["id > ? and group_id = ?", params[:id], @group.id])}
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end