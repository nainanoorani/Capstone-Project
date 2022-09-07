function selectWord(array) {

    const index = Math.floor(Math.random()*array.length);

    let word = array[index];

    return word
    
}
    


module.exports = {
    selectWord
}