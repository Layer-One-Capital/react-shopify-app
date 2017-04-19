class RemoveShopIdFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :shop_id, :integer
  end
end
