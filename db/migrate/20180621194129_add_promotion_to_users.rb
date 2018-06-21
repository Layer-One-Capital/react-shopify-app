class AddPromotionToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :promotion, foreign_key: true
  end
end
