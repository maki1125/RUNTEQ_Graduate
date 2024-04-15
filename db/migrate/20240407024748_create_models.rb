class CreateModels < ActiveRecord::Migration[7.0]
  def change
    create_table :modes do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: true
      t.integer :play_mode
      t.integer :picture_mode
      t.integer :level_mode

      t.timestamps
    end
  end
end
