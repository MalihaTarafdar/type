import { setTheme } from './theme.js'
import ShortcutHandler from './shortcuts.js'
import WordCountMode from './wordcount.js'

const text = document.querySelector('#terminal > #text')
const input = document.querySelector('#terminal > #input-container > #input')
const redo = document.querySelector('#redo-btn')

class _ShortcutHandler extends ShortcutHandler {
	onInputFocus() {
		super.onInputFocus()
		input.focus()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setTheme('nord')
	let wc = new WordCountMode(input)
	wc.setText(10, text)
	new _ShortcutHandler()
	redo.addEventListener('click', () => {
		wc.reset(text, input)
		console.log('reset')
	})
})