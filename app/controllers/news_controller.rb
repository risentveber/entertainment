class NewsController < ApplicationController
  def create
    NewsItem.create text: params[:textHW], classroom_id: params[:classroom_id], user_id: current_user.id
    redirect_to classroom_path(params[:classroom_id])
  end

  def destroy
    news = NewsItem.find(params[:id])
    if current_user.id == news.user_id
      news.destroy
    end
    redirect_to classroom_path(news.classroom_id)
  end

  def comment
    NewsItem.find(params[:id]).comments.create body: params[:textHW_comment], user_id: current_user.id
    redirect_to classroom_path(params[:classroom_id])
  end
end