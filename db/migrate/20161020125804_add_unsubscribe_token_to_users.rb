class AddUnsubscribeTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :unsubscribe_token, :string
  end
end
