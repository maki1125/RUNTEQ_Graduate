class CreatePictures < ActiveRecord::Migration[7.0]
  def change
    create_table :pictures do |t|
      t.string :name
      t.string :img
      t.text :youtube_url
      t.string :type

      t.timestamps
    end
  end
end
