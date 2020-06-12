export default class WordCountMode {
	constructor() {
		this.WORDLIST_COUNT = 1
		this.wordList = []
		this.setWordList()
		this.currentWordInd = 0
	}
	async setText() {
		await this.setWordList()
	}
	async setWordList() {
		const res = await fetch(`texts/words/list${Math.floor(Math.random() * this.WORDLIST_COUNT) + 1}.txt`)
		if (!res.ok) return
		const text = await res.text()
		let word = ""
		for (let i = 0; i < text.length; i++) {
			if (text.charAt(i) === ' ') {
				if (word != '') this.wordList.push(word)
				word = ''
			} else {
				word += text.charAt(i)
			}
		}
		this.wordList.sort(() => 0.5 - Math.random())
	}
}