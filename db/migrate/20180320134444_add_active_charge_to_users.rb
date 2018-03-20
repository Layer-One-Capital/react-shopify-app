class AddActiveChargeToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :active_charge, :boolean, default: false
  end
end
