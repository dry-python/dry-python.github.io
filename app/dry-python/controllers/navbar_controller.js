import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['menuItems']

  toggle() {
    this.menuItemsTarget.classList.toggle('hidden')
  }
}
