import { themes } from "./themes.js";

function setTheme(themeName) {
	const theme = themes.get(themeName)
	for (const property in theme) {
		document.documentElement.style.setProperty(property, theme[property])
	}
}

setTheme('nord')