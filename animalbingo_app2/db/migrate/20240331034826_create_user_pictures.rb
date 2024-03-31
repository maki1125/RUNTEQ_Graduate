class CreateUserPictures < ActiveRecord::Migration[7.0]
  def change
    create_table :user_pictures do |t|
      t.references :user, null: false, foreign_key: true
      t.references :picture, null: false, foreign_key: true
      t.string :type

      t.timestamps
    end
  end
end
