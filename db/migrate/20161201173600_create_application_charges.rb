class CreateApplicationCharges < ActiveRecord::Migration[5.0]
  def change
    create_table :application_charges do |t|
      t.belongs_to :user, null: false, index: true, type: :uuid
      t.decimal    :amount_usd, :precision => 8, :scale => 2, null: false
      t.datetime   :date_created, null: false # naming this differently than timestamps because it's the date the charge is created, not the database record
    end
  end
end
