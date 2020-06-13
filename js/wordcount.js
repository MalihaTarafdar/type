export default class WordCountMode {
	constructor(input) {
		this.WORDLIST_COUNT = 1
		this.wordList = []
		this.cur = 0
		input.addEventListener('keypress', e => {
			if (e.key === ' ') {
				//delay to clear input
				setTimeout(() => {
					input.value = ''
				}, 50);
				this.check(text)
				this.next(text)
			}
		})
	}

	reset() {

	}

	check(text) {
		const word = text.querySelector(`span:nth-child(${this.cur + 1})`)
		word.classList.add((this.wordList[this.cur] === input.value) ? 'correct' : 'incorrect')
		word.classList.remove('current')
	}

	next(text) {
		this.cur++
		const word = text.querySelector(`span:nth-child(${this.cur + 1})`)
		word.classList.add('current')
	}

	async setText(wordCount, text) {
		await this.setWordList(wordCount)
		text.innerHTML = ''
		for (let i = 0; i < wordCount; i++) {
			let span = document.createElement('span')
			span.textContent = this.wordList[i] + ' '
			text.appendChild(span)
		}
		text.querySelector('#terminal > #text > span:first-child').classList.add('current')
	}

	async setWordList(wordCount) {
		const res = await fetch(`texts/words/list${Math.floor(Math.random() * this.WORDLIST_COUNT) + 1}.txt`)
		if (!res.ok) return
		const text = await res.text()
		let word = ""
		for (let i = 0; i < text.length; i++) {
			if (text.charAt(i) === ' ') {
				if (word != '') this.wordList.push(word)
				word = ''
			} else word += text.charAt(i)
		}
		this.wordList.sort(() => 0.5 - Math.random())
		this.wordList.length = wordCount
	}
}