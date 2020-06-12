import { setTheme } from './theme.js'
import ShortcutHandler from './shortcuts.js'
import WordCountMode from './wordcount.js'

const input = document.querySelector('#terminal-input')
const text = document.querySelector('#terminal > #text')

class _WordCountMode extends WordCountMode {
	async setText() {
		await super.setText()
		text.innerHTML = ''
		for (let i = 0; i < this.wordList.length; i++) {
			let span = document.createElement('span')
			span.textContent = this.wordList[i] + ' '
			text.appendChild(span)
		}
	}
}

class _ShortcutHandler extends ShortcutHandler {
	onInputFocus() {
		super.onInputFocus()
		input.focus()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new _WordCountMode().setText()
	setTheme('nord')
	new _ShortcutHandler()
})