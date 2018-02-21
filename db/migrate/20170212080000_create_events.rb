class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.text :action
      t.text :details
      t.datetime :occurred_at
      t.integer :admin_id
      t.integer :eventable_id
      t.text :eventable_type

      t.timestamps
    end
  end
end
