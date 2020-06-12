export async function setTheme(name) {
	const theme = await getTheme(name)
	console.log(theme)
	for (const property in theme) {
		document.documentElement.style.setProperty(property, theme[property])
	}
}

async function getTheme(name) {
	const res = await fetch(`../themes/${name}.json`)
	if (!res.ok) return
	return res.json()
}