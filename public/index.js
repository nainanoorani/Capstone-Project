const newGameBtn = document.querySelector('#newGame')
const hangmanImg = document.querySelector('#hangman-img')
const correctDiv = document.querySelector('#correctLetters')
const guessLetter = document.querySelector('#letter')
const guessLetterForm = document.querySelector('#letterForm')
const userWord =document.querySelector('#user-word');
const userWordForm =document.querySelector('#userWordForm');
const deleteWord =document.querySelector('#delete-word');
const deleteWordForm =document.querySelector('#deleteWordForm');
const numWrong =document.querySelector('#wrongLetter');
const outcome = document.querySelector('#outcome')

const resultsText = document.querySelector('#results')

let correctGuesses = [];
let wrongScore = 0;
let newWord= []; 
let incompleteWord = [];



// When they click new game, get random word and display blanks. Returns word and underscores.
const newGame = () => {
    wrongScore = 0;
    hangmanPic();
    guessLetterForm.reset();
    userWordForm.reset();
    axios.get("/api/word/")
        .then(res => {
            // newWord = res.data.toLowerCase().split('');
            aWord=res.data.name;
            newWord = aWord.toLowerCase().split('');
            console.log(newWord);
            
            let underscores='';
            for(i=0; i<newWord.length; i++){
            underscores+= '_';
            }
            incompleteWord=underscores.split('');
            console.log(incompleteWord);
            
            resultsText.textContent=underscores;
    })
    
}

//working. add user word to database
const addToDatabase = (evt) => {
    evt.preventDefault();
    let body ={name: userWord.value};
    console.log(body);
    axios.post('/api/word', body)
        .then(res=> {
            let addedName = res.data[0].name;
            alert(`${addedName} was added successfully`)})
    userWordForm.reset();
}

const deleteFromDatabase = (evt) => {
    evt.preventDefault();
    let body ={name: deleteWord.value};
    console.log(body);
    axios.delete(`/api/word/${body.name}`)
        .then(res=> {
            alert(`Your word was deleted successfully`)})
    deleteWordForm.reset();
}


//how to get this to update
const hangmanPic = () => {
    if (wrongScore == 0){
        //gallows
        hangmanImg.src='/images/hangman.png'; 
    }     
    else if (wrongScore ==1){
        //make head
        hangmanImg.src='/images/hangman_head.png';    
        }

    else if(wrongScore ==2){
        //make body
        hangmanImg.src='/images/hangman_body.png';
    }
    else if(wrongScore ==3){
        //make arms
        hangmanImg.src='/images/hangman_arms.png' 
        }
    else if(wrongScore ==4){
         //make legs
         hangmanImg.src='/images/hangman_legs.png' 
        }
    else if (wrongScore ==5){
            //make face 
            hangmanImg.src='/images/hangman_face.png';
        }
    else {
            //make superman
            hangmanImg.src='/images/hangman_superhero.png';
            outcome.textContent ='Game over, you lost!';
            //how can i clear the image when there is a new guess
}
}
//function to check if split string arrays are equal
const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

const processGuess = (evt) => {
    evt.preventDefault();
    outcome.textContent='';
    let guess = guessLetter.value.toLowerCase();
    let indeces = [];
    if((equals(newWord,incompleteWord))){
        outcome.textContent="Congrats you won!";
    }
    else if(wrongScore>=6){
        outcome.textContent="Game over, you lost!";
    }
    else if(newWord.includes(guess)){
        for(let i=0; i<newWord.length; i++){
        if(newWord[i]==guess){
            indeces.push(i);
            //add the letter to that index (replace underscore)
            incompleteWord[i]=guess;
        }
        }
        console.log(indeces);
        resultsText.textContent=incompleteWord.join('');
        console.log(incompleteWord);
    } else{
        wrongScore++;
        numWrong.textContent =`Wrong Guesses: ${wrongScore}`;
        outcome.textContent='Letter Not In Word';
        hangmanPic();
    }
    if((equals(newWord,incompleteWord))){
        outcome.textContent="Congrats you won!";
    }
    
    guessLetterForm.reset();
}


newGameBtn.addEventListener('click',newGame)
guessLetterForm.addEventListener('submit', processGuess)
userWordForm.addEventListener('submit',addToDatabase)
deleteWordForm.addEventListener('submit',deleteFromDatabase)




