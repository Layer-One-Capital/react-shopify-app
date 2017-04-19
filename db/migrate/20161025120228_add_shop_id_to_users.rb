class AddShopIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :shop_id, :integer
  end
end
