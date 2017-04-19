class AddConfirmedToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :confirmed, :boolean, null: false, default: false
  end
end
