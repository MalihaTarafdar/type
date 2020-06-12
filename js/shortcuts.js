export default class ShortcutHandler {
	constructor() {
		document.addEventListener('keypress', (e) => {
			if (e.key === 'f') this.onInputFocus()
		})
	}
	onInputFocus() {}
}