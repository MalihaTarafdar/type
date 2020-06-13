export default class WordCountMode {
	constructor(input) {
		this.WORDLIST_COUNT = 1
		this.wordList = []
		this.cur = 0
		const wordsRemainingDisplay = document.querySelector('#modes')
		input.addEventListener('keypress', e => {
			if (this.cur < this.wordList.length && e.key === ' ') {
				//delay to clear input
				setTimeout(() => {
					input.value = ''
				}, 50)
				this.check(text)
				this.next(text)
				wordsRemainingDisplay.textContent = `Words Remaining: ${this.wordList.length - this.cur}`
			} else if (this.cur === this.wordList.length - 1) {
				setTimeout(() => {
					console.log(input.value, this.wordList[this.cur])
					this.check(text)
					this.showStats()
				}, 50)
				wordsRemainingDisplay.textContent = `Words Remaining: ${0}`
			}
		})
	}

	showStats() {
		const wpmDisplay = document.querySelector('#wpm')
		const accDisplay = document.querySelector('#acc')
	}

	reset(text, input) {
		this.setText(this.wordList.length, text)
		this.cur = 0
		input.value = ''
		input.focus()
	}

	check(text) {
		const word = text.querySelector(`span:nth-child(${this.cur + 1})`)
		word.classList.remove('correct')
		word.classList.remove('incorrect')
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
		const wordsRemainingDisplay = document.querySelector('#modes')
		wordsRemainingDisplay.textContent = `Words Remaining: ${this.wordList.length - this.cur}`
	}
}