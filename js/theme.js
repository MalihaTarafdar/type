const themes = new Map()
themes.set('nord', {
	"--bg-color": "#242933",
	"--text-color": "#ECEFF4",
	"--terminal-color": "#2E3440",
	"--input-color": "#3B4252",
	"--redo-color": "#3B4252",
	"--highlight-color": "#4d8ee9",
	"--correct-color": "#A3BE8C",
	"--incorrect-color": "#BF616A",
	"--neutral-color": "#B38DAC"
})
themes.set('dark', {
	"--bg-color": "#1A1A1A",
	"--text-color": "#FFFFFF",
	"--terminal-color": "#333333",
	"--input-color": "#1A1A1A",
	"--redo-color": "#1A1A1A",
	"--highlight-color": "#4d8ee9",
	"--correct-color": "#66B422",
	"--incorrect-color": "#C6262E",
	"--neutral-color": "#A56DE2"
})

export function setTheme(themeName) {
	const theme = themes.get(themeName)
	for (const property in theme) {
		document.documentElement.style.setProperty(property, theme[property])
	}
}