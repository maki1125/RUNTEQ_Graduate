// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = false //リロードしなくてもjavascript反映されるようにするため。これを追加することでlogoutできなくなった。
import "@hotwired/turbo-rails"
import "controllers"




