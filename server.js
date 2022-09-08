const express = require('express')
const path = require('path')
const app = express()

const {
    selectWord,
    addWord
} = require('./controller')

app.use(express.json())

//Part 1 
//add this line to make heroku connect to public folder
app.use(express.static(path.join(__dirname, '/public')));

//Select Word. Axios requests this function. Pass in superherowords
app.get('/api/selectWord', selectWord)

//Add Word to superHeroWords.
app.post('/api/addWord', addWord)

//Should this be a put request?
// app.get('/api/player', (req, res) => {
//     try {
//         res.status(200).send(playerRecord)
//     } catch (error) {
//         console.log('ERROR GETTING PLAYER STATS', error)
//         res.sendStatus(400)
//     }
// })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})