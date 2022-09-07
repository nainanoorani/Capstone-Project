const enterBtn = document.querySelector('#enter')

const newGameBtn = document.querySelector('#newGame')
const scoreDiv = document.querySelector('#score')

const resultsText = document.querySelector('#results')
const playAgainBtn = document.querySelector('#play-again')
const wrongText = document.querySelector('#wrong')





let choices = []
// let compDuo = []
// let playerDuo = []

//call these if you guess incorrectly
const makeHead = () => {
    return `
        <div id="hang-man">
        <img src='/images/hangman_head.png' alt='hangman-head'/>
    `
}
const makeBody = () => {
    return `
        <div id="hang-man">
        <img src='/images/hangman_body.png' alt='hangman-body'/>
    `
}

const makeArms = () => {
    return `
        <div id="hang-man">
        <img src='/images/hangman_arms.png' alt='hangman-arms'/>
    `
}

const makeLegs = () => {
    return `
        <div id="hang-man">
        <img src='/images/hangman_legs.png' alt='hangman-legs'/>
    `
}

const makeSuperHero = () => {
    return `
        <div id="hang-man">
        <img src='/images/hangman_superhero.png' alt='hangman-superhero'/>
    `
}

const renderChoices = () => {
    choicesDiv.innerHTML = ''
    chooseHeader.classList.remove('hide')

    choices.forEach(choice => {
        let botHtml = makeRobotChoiceCard(choice)
        choicesDiv.innerHTML += botHtml
    })
}

const getPlayerStats = () => {
    axios.get('/api/player')
        .then(({data: {wrong}}) => {
            wrongText.textContent = `Wrong: ${wrong}`
          
        })
}

drawBtn.addEventListener('click', drawFive)
duelBtn.addEventListener('click', duel)
playAgainBtn.addEventListener('click', reset)
seeAllBtn.addEventListener('click', getAllBots)

getPlayerStats()