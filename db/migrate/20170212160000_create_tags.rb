class CreateTags < ActiveRecord::Migration
  def self.up
    if table_exists?(:tags)
      drop_table :tags
    end

    create_table :tags do |t|
      t.string :tagable_type
      t.string :tagable_id
      t.string :name

      t.timestamps null: false

    end

    add_index :tags, :id,                unique: true
  end

  def self.down
    # By default, we don't want to make any assumption about how to roll back a migration when your
    # model already existed. Please edit below which fields you would like to remove in this migration.
    raise ActiveRecord::IrreversibleMigration
  end
end
