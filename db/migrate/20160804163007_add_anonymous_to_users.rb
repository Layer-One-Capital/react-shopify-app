class AddAnonymousToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :anonymous, :boolean, null: false, default: false
  end
end
