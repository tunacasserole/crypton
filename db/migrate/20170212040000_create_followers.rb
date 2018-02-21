class CreateFollowers < ActiveRecord::Migration[5.0]
  def change
    create_table :followers do |t|
      t.integer :followable_id
      t.string :followable_type
      t.integer :admin_id
      t.string :interest_level

      t.timestamps
    end
  end
end
