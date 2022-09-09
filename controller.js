const {superHeroWords} = require('./data')
const newWord = ['POST request'];

module.exports = {
    selectWord: (req,res) => {
    
    let array = superHeroWords;

    const index = Math.floor(Math.random()*array.length);

    let word = array[index];

    res.status(200).send(word);
    
},
    addWord: (req, res) => {
    
        // getting the new word from front end
        let {newWord} = req.body;

        if (superHeroWords.includes(newWord)) {
            res.status(200).send('Word is already in our database.')
            
        } else {
            superHeroWords.push(newWord);
            console.log(newWord);
            res.status(200).send(`${newWord} Added`)
        }
    } 
}


//Request User Input Letter Respond with Index of Letter. Move to front end. 
// app.get('/api/guessLetter', (req, res) => {
//     try {
//         let {letter} = req.body;
//         //check if the word includes user input letter and return the letter and index
//         if(word.includes(letter)){
//             let index = word.indexOf(letter);
//             return index
//         } else {
//         }
//         res.status(200).send(letter, index)
//     } catch (error) {
//         console.log('ERROR IN GUESS LETTER ', error)
        
//         res.sendStatus(400)
//     }
// })


// module.exports = {
//     selectWord
// }