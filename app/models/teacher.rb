class Teacher < User
  has_many :his_main_classrooms, foreign_key: "main_teacher_id", class_name: "Classroom"
  has_and_belongs_to_many :classrooms, join_table: 'classrooms_teachers'
  has_many :homeworks

  has_and_belongs_to_many :subjects, join_table: 'subjects_teachers'
end
