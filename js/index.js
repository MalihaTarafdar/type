import { setTheme } from './theme.js'
import ShortcutHandler from './shortcuts.js'
import WordCountMode from './wordcount.js'

const text = document.querySelector('#terminal > #text')
const input = document.querySelector('#terminal > #input-container > #input')

class _ShortcutHandler extends ShortcutHandler {
	onInputFocus() {
		super.onInputFocus()
		input.focus()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setTheme('nord')
	new WordCountMode(input).setText(10, text)
	new _ShortcutHandler()
})