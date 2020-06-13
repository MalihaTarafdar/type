export default class WordCountMode {
	constructor(input) {
		this.WORDLIST_COUNT = 1
		this.wordList = []
		this.cur = 0
		this.correctCharacters = 0
		this.totalCharacters = 0
		const wordsRemainingDisplay = document.querySelector('#modes')
		input.addEventListener('keypress', e => {
			if (this.startTime === undefined) this.startTime = Date.now()
			if (this.cur < this.wordList.length - 1 && e.key === ' ') {
				if (input.value === '') {
					e.preventDefault()
					return
				}
				//delay to clear input
				setTimeout(() => {
					input.value = ''
				}, 20)
				this.check(text)
				this.next(text)
				wordsRemainingDisplay.textContent = `Words Remaining: ${this.wordList.length - this.cur}`
			} else if (this.cur === this.wordList.length - 1) {
				setTimeout(() => {
					if (input.value.length === this.wordList[this.cur].length) {
						this.check(text)
						this.showStats()
					}
				}, 20)
				wordsRemainingDisplay.textContent = `Words Remaining: ${0}`
			}
		})
	}

	showStats() {
		const wpmDisplay = document.querySelector('#wpm')
		const accDisplay = document.querySelector('#acc')
		const seconds = (Date.now() - this.startTime) / 1000
		wpmDisplay.textContent = `WPM: ${Math.floor(this.correctCharacters / 5 / seconds * 60)}`
		console.log(this.correctCharacters, this.totalCharacters)
		accDisplay.textContent = `ACC: ${Math.floor(this.correctCharacters / this.totalCharacters * 100)}`
	}

	reset(text, input) {
		this.setText(this.wordList.length, text)
		this.cur = 0
		this.correctCharacters = 0
		this.totalCharacters = 0
		this.startTime = undefined
		input.value = ''
		input.focus()
	}

	check(text) {
		const word = text.querySelector(`span:nth-child(${this.cur + 1})`)
		word.classList.remove('correct')
		word.classList.remove('incorrect')
		word.classList.add((this.wordList[this.cur] === input.value) ? 'correct' : 'incorrect')
		word.classList.remove('current')
		if (this.wordList[this.cur] != input.value) {
			const word = this.wordList[this.cur]
			for (let i = 0; i < word.length; i++) {
				if (word.charAt(i) === input.value.charAt(i)) this.correctCharacters++
			}
			this.correctCharacters -= (input.value.length - word.length)
			this.correctCharacters++
		} else {
			this.correctCharacters += input.value.length + 1
		}
		if (this.cur === this.wordList.length - 1) this.correctCharacters--
	}

	next(text) {
		this.cur++
		const word = text.querySelector(`span:nth-child(${this.cur + 1})`)
		word.classList.add('current')
	}

	setTotalCharacters() {
		for (let i = 0; i < this.wordList.length; i++) {
			this.totalCharacters += this.wordList[i].length + 1
		}
		this.totalCharacters--
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
		this.setTotalCharacters()
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