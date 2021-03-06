class MaterialsController < ApplicationController
  skip_before_action :require_login, only: [ :index, :show ]

  def index
  	@classroom = Classroom.find(params[:classroom_id])
    @materials = @classroom.materials.order(created_at: :desc)
  end

  def new
    @material = Material.new
  end

  def create
    @material = Material.new do |m|
      m.description = params[:description]
      m.user = current_user
      m.subject_id = params[:tag]
    end
    @material.save!

    @material.classrooms << Classroom.find(params[:classroom_id])

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    Attachment.find(@files).each do |f|
      f.attachable = @material
      f.save!
    end

    unless params[:main_image].blank?
      @main = Attachment.find(Integer(params[:main_image]))
      @main.attachable = @material
      @main.main = true
      @main.save!
    end
    @material.classrooms_count = 1 #какой-то баг при создании
    render @material, layout: false
  end

  def edit
    @material = Material.first
  end

  def update
    @material = Material.find(params[:id])
    @material.description = params[:description]
    @material.subject_id = params[:tag]
    @material.save!

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    new_main_image = params[:main_image].blank? ? [] : [Integer(params[:main_image])]
    @material.attachments.where.not(id: @files + new_main_image).destroy_all
    Attachment.find(@files).each do |f|
      f.attachable = @material
      f.save!
    end

    unless params[:main_image].blank?
      @new_image_id = Integer(params[:main_image])
      if @material.main_image && @new_image_id != @material.main_image.id
        @material.main_image.destroy
      end
      @main = Attachment.find(@new_image_id)
      @main.attachable = @material
      @main.main = true
      @main.save!
    end

    @material.attachments(true)
    render @material, layout: false
  end

  def show
    @material = Material.find(params[:id])
    render "show", layout: false
  end

  def destroy
    Material.find(params[:id]).destroy
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def share
    material = Material.find(params[:material_id])

    if params[:type] == 'classroom'
      logger.debug "Делимся с классом " + params[:id]
      classroom_id = Integer(params[:id])
      unless material.classroom_shares.exists? ({classroom_id: classroom_id})
        material.classroom_shares.create ({classroom_id: classroom_id})
      end
    elsif params[:type] == 'community'
      logger.debug "Делимся с сообществом " + params[:id]
      community_id = Integer(params[:id])
      unless material.community_shares.exists? ({community_id: community_id})
        material.community_shares.create ({community_id: community_id})
      end
    end
    render text: material.times_shared
  end

  private
    def material_params
      params.require(:material).permit(:name, :description, :file)
    end
end
