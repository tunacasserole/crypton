class CreateCoins < ActiveRecord::Migration[5.0]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :description
      t.string :website
      t.string :github
      t.string :rating

      t.timestamps
    end
  end
end
