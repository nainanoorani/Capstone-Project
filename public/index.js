const newGameBtn = document.querySelector('#newGame')
const hangmanImg = document.querySelector('#hangman-img')
const correctDiv = document.querySelector('#correctLetters')
const guessLetter = document.querySelector('#letter')
const guessLetterForm = document.querySelector('#letterForm')
const userWord =document.querySelector('#user-word');
const userWordForm =document.querySelector('#userWordForm');
const playAgainBtn = document.querySelector('#play-again')
const resultsText = document.querySelector('#results')

let correctGuesses = [];
let wrongScore = 0;
let newWord= []; 
let incompleteWord = [];



// When they click new game, get random word and display blanks. Returns word and underscores.
const newGame = () => {
    axios.get("http://localhost:3000/api/selectWord/")
        .then(res => {
            newWord = res.data.toLowerCase().split('');
            console.log(newWord);
            
            let underscores='';
            for(i=0; i<newWord.length; i++){
            underscores+= '_ ';
            }
            console.log(underscores);
            incompleteWord=underscores;
            
            // const p = document.createElement('p');
            // resultsText.appendChild(underscores)
    })
}

//working
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
            //make face NOT WORKING
            hangmanImg.src=='/images/hangman_face.png';
        }
    else {
            //make superman
            hangmanImg.src='/images/hangman_superhero.png';
            console.log('Game over, you lost!')
            //how can i clear the image when there is a new guess
}
}

const processGuess = (evt) => {
    evt.preventDefault();
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
    } else{
        wrongScore++;
        console.log(wrongScore);
        hangmanPic();
        console.log('Letter Not In Word')
    }
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

// playAgainBtn.addEventListener('click', reset)


// getPlayerStats()