const newGameBtn = document.querySelector('#newGame')
const hangmanImg = document.querySelector('#hangman-img')
const correctDiv = document.querySelector('#correctLetters')
const guessLetter = document.querySelector('#letter')
const guessLetterForm = document.querySelector('#letterForm')
const userWord =document.querySelector('#user-word');
const userWordForm =document.querySelector('#userWordForm');
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
    axios.get("http://localhost:3000/api/selectWord/")
        .then(res => {
            newWord = res.data.toLowerCase().split('');
            console.log(newWord);
            
            let underscores='';
            for(i=0; i<newWord.length; i++){
            underscores+= '_';
            }
            incompleteWord=underscores.split('');
            console.log(incompleteWord);
            // var text =document.createTextNode(underscores)
            // resultsText.appendChild(text);
            resultsText.textContent=underscores;
    })
    
}

//working. add user word to database
const addToDatabase = (evt) => {
    evt.preventDefault();
    let body ={newWord: userWord.value};
    axios.post('http://localhost:3000/api/addWord', body)
        .then(res=> {
            alert(res.data)})
}

    // choices.forEach(choice => {
    //     let botHtml = makeRobotChoiceCard(choice)
    //     choicesDiv.innerHTML += botHtml
    // })

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
    if(newWord.includes(guess)){
        for(let i=0; i<newWord.length; i++){
        if(newWord[i]==guess){
            indeces.push(i);
            //how to add the letter to that index (replace underscore)
            incompleteWord[i]=guess;
        }
        }
        console.log(indeces);
        resultsText.textContent=incompleteWord.join('');
        console.log(incompleteWord);
    } else{
        wrongScore++;
        console.log(wrongScore);
        outcome.textContent='Letter Not In Word';
        hangmanPic();
    }
    if(equals(newWord, incompleteWord)){
        outcome.textContent="Congrats you won!";
    }
    guessLetterForm.reset();
}



//Correct Choices


// const getPlayerStats = () => {
//     axios.get('/api/player')
//         .then(({data: {wrong}}) => {
//             wrongText.textContent = `Wrong: ${wrong}`
          
//         })
// }

newGameBtn.addEventListener('click',newGame)
userWordForm.addEventListener('submit',addToDatabase)
guessLetterForm.addEventListener('submit', processGuess)




// getPlayerStats()