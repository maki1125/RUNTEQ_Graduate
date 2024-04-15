class RemoveTypeFromUserPictures < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_pictures, :type
  end
end
