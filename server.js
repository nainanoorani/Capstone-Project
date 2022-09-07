const express = require('express')
const path = require('path')
const app = express()
const {superHeroWords} = require('./data')
const {selectWord} = require('./controller')

app.use(express.json())

//Part 1 
//add this line to make heroku connect to public folder
app.use(express.static(path.join(__dirname, '/public')));

//Select Word
let word = selectWord(superHeroWords);

//Send blank letters to front end
app.get('/api/wordBlanks', (req, res) => {
    try {
        let underscores='';
        for(i=0; i<word.length; i++){
        underscores+= '_ ';}
       
        res.status(200).send({underscores})
    } catch (error) {
        console.log('ERROR SELECTING SUPER HERO WORD', error)
        res.sendStatus(400)
    }
})

//Request User Input Letter Respond with Index of Letter
app.get('/api/guessLetter', (req, res) => {
    try {
        let {letter} = req.body;
        //check if the word includes user input letter and return the letter and index
        if(word.includes(letter)){
            let index = word.indexOf(letter);
            return index
        } else {
        }
        res.status(200).send(letter, index)
    } catch (error) {
        console.log('ERROR IN GUESS LETTER ', error)
        
        res.sendStatus(400)
    }
})

//Add Word to superHeroWords

app.post('/api/addWord', (req, res) => {
    try {
        // getting the new word from front end
        let {newWord} = req.body;

        // comparing the total health to determine a winner
        if (superHeroWords.includes(newWord)) {
            res.status(200).send('Word is already in our database.')
            
        } else {
            superHeroWords.push(newWord);
       
            res.status(200).send('Word Added')
        }
    } catch (error) {
        console.log('ERROR ADDING WORD TO DATABASE', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})