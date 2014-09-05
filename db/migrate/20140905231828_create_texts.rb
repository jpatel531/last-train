class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :from
      t.string :to
      t.text :instructions
      t.datetime :time

      t.timestamps
    end
  end
end
