class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.integer :from_id
      t.integer :to_id
      t.text :body
      t.string :state

      t.timestamps
    end
  end
end
