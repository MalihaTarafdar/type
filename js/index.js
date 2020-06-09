import { setTheme } from "./theme.js";

const input = document.querySelector('#terminal-input')
const text = document.querySelector('#terminal > #text')

document.addEventListener('DOMContentLoaded', () => {
	setTheme('nord')
	//shortcut to focus input
	document.addEventListener('keypress', (e) => {
		if (e.key === 'f') input.focus()
	})
})