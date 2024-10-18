
import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
import DateDiffController from "./controllers/datediff_controller.js"
import DateAddController from "./controllers/dateadd_controller.js"
import DateBlockController from "./controllers/dateblock_controller.js"
import DateTodayController from "./controllers/datetoday_controller.js"

window.Stimulus = Application.start()

Stimulus.register("datediff", DateDiffController)
Stimulus.register("dateadd", DateAddController)
Stimulus.register("dateblock", DateBlockController)
Stimulus.register("datetoday", DateTodayController)
