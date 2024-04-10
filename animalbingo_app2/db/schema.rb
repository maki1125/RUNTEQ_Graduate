# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_04_07_024748) do
  create_table "contacts", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.text "message", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modes", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "play_mode"
    t.integer "picture_mode"
    t.integer "level_mode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_modes_on_user_id", unique: true
  end

  create_table "pictures", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "img"
    t.text "youtube_url"
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_pictures", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "picture_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["picture_id"], name: "index_user_pictures_on_picture_id"
    t.index ["user_id"], name: "index_user_pictures_on_user_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email", null: false
    t.string "crypted_password"
    t.string "salt"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "modes", "users"
  add_foreign_key "user_pictures", "pictures"
  add_foreign_key "user_pictures", "users"
end
