import { setTheme } from './theme.js'
import ShortcutHandler from './shortcuts.js'
import WordCountMode from './wordcount.js'

const text = document.querySelector('#terminal > #text')
const input = document.querySelector('#terminal > #input-container > #input')

class _WordCountMode extends WordCountMode {
	constructor() {
		super()
		input.addEventListener('keypress', e => {
			if (e.key === ' ') {
				//delay to clear input
				setTimeout(() => {
					input.value = ''
				}, 50);

				let word = text.querySelector(`span:nth-child(${this.cur + 1})`)
				word.classList.add((this.wordList[this.cur] === input.value) ? 'correct' : 'incorrect')
				word.classList.remove('current')

				this.cur++
				word = text.querySelector(`span:nth-child(${this.cur + 1})`)
				word.classList.add('current')
			}
		})
	}
	async setText(wordCount) {
		await super.setText(wordCount)
		text.innerHTML = ''
		for (let i = 0; i < wordCount; i++) {
			let span = document.createElement('span')
			span.textContent = this.wordList[i] + ' '
			text.appendChild(span)
		}
		text.querySelector('#terminal > #text > span:first-child').classList.add('current')
	}
}

class _ShortcutHandler extends ShortcutHandler {
	onInputFocus() {
		super.onInputFocus()
		input.focus()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setTheme('nord')
	new _WordCountMode().setText(10)
	new _ShortcutHandler()
})