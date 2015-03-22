class Teacher < User
  has_many :his_main_classrooms, foreign_key: "main_teacher_id", class_name: "Classroom"
  has_and_belongs_to_many :classrooms

  authenticates_with_sorcery!

  def teacher?
    true
  end
end
