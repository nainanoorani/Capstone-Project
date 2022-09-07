const {shuffleArray} = require('./utils')

describe('shuffleArray should return an array of the same length and items of the argument and shuffle them', () => {
    // CODE HERE for Part 3
        test('check that data type returned is an array', ()=> {
            let output = shuffleArray([1,2,3,4]);
            expect(output instanceof Array).toEqual(true);
        })

        test('check that the array length is the same length as the argument', ()=> {
            let output = shuffleArray([1,2,3,4]);
            expect(output.length).toEqual(4);
          })
          
        test('check that all the same items are in the array', ()=> {
            const expected = [1,2,3,4]
            const result =shuffleArray([1,2,3,4]);
            expect(result).toEqual(expect.arrayContaining (expected));
        })
    
        test('check that all the same items have been shuffled', ()=> {
            expect(shuffleArray([1,2,3,4])).not.toEqual([1,2,3,4])
        })


})