import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["date"]

  connect() {
    var today = new Date().toISOString().substring(0, 10)
    this.element.value = today
  }
}