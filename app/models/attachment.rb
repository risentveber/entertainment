class Attachment < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true

  mount_uploader :file, FileUploader

  def image?
    ['jpg', 'gif', 'png'].include?(file.file.extension)
  end

  def type
    extension = file.file.extension
    if ['jpg', 'gif', 'png'].include?(extension)
      return "image"
    else
      return "other"
    end
  end
end
