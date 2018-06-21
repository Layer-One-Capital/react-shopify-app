class CreatePromotions < ActiveRecord::Migration[5.1]
  def change
    create_table :promotions do |t|
      t.string :code
      t.datetime :expiration_date
      t.decimal :price, precision: 8, scale: 2

      t.timestamps
    end
  end
end
