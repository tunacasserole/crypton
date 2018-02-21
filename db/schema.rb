# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180301040000) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blogs", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "chats", force: :cascade do |t|
    t.integer  "from_id"
    t.integer  "to_id"
    t.text     "body"
    t.string   "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coins", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "website"
    t.string   "github"
    t.string   "rating"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", force: :cascade do |t|
    t.text     "action"
    t.text     "details"
    t.datetime "occurred_at"
    t.integer  "admin_id"
    t.integer  "eventable_id"
    t.text     "eventable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "factors", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "followers", force: :cascade do |t|
    t.integer  "followable_id"
    t.string   "followable_type"
    t.integer  "admin_id"
    t.string   "interest_level"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "admin_id"
    t.string   "body"
    t.string   "state"
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "states", force: :cascade do |t|
    t.string   "stateable_type"
    t.string   "stateable_id"
    t.string   "before"
    t.string   "after"
    t.string   "requester_id"
    t.string   "approver_id"
    t.string   "status"
    t.date     "occurs_on"
    t.date     "requested_on"
    t.date     "replied_on"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["id"], name: "index_states_on_id", unique: true, using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "tagable_type"
    t.string   "tagable_id"
    t.string   "name"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["id"], name: "index_tags_on_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
