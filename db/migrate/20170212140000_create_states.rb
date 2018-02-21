class CreateStates < ActiveRecord::Migration
  def self.up
    if table_exists?(:states)
      drop_table :states
    end

    create_table :states do |t|
      t.string :stateable_type
      t.string :stateable_id
      t.string :before
      t.string :after
      t.string :requester_id
      t.string :approver_id
      t.string :status
      t.date :occurs_on
      t.date :requested_on
      t.date :replied_on

      t.timestamps null: false

    end

    add_index :states, :id,                unique: true
  end

  def self.down
    # By default, we don't want to make any assumption about how to roll back a migration when your
    # model already existed. Please edit below which fields you would like to remove in this migration.
    raise ActiveRecord::IrreversibleMigration
  end
end
