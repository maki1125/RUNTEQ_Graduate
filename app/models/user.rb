class User < ApplicationRecord
  has_many :user_pictures
  has_many :pictures, through: :user_pictures
  has_one :mode, dependent: :destroy
  # それぞれの絵柄の一覧を取得する
  def animals
    pictures.where(type: 'Animal')
  end
  def fishes
    pictures.where(type: 'Fish')
  end
  def dinosaurs
    pictures.where(type: 'Dinosaur')
  end

  authenticates_with_sorcery!

  validates :password, length: { minimum: 1 }, if: -> { new_record? || changes[:crypted_password] }
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true, length: { maximum: 255 }
end
