require('dotenv').config()
const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env
 
// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
   dialect: 'postgres',
   dialectOptions: {
       ssl: {
           rejectUnauthorized: false   //says I don't need security in accessing database
       }
   }
}
)

// const {superHeroWords} = require('./data')
const newWord = ['POST request'];

module.exports = {

    // getWord: (req,res) => {

    //     sequelize.query(`
    //         SELECT name FROM superHeroWords;`
    //         ).then(dbRes=> {
    //             res.status(200).send(dbRes[0]);
    //         }).catch(err => console.log('error getting superHero words', err))

    // },

    selectWord: (req,res) => {
    
 
    sequelize.query(`
        SELECT name FROM superHeroWords;`
        ).then(dbRes=> {
            let array = dbRes[0];
            const index = Math.floor(Math.random()*array.length);
            let word = array[index];
            res.status(200).send(word);
        }).catch(err => console.log('error getting random super hero word', err))

        

    
},
    addWord: (req, res) => {
    
        // getting the new word from front end
        let {name} = req.body;

        // if (superHeroWords.includes(newWord)) {
        //     res.status(200).send('Word is already in our database.')
            
        // } else {
            
            sequelize.query(`
             INSERT INTO superHeroWords(name) VALUES ('${name}') RETURNING *
             `).then(dbRes => res.status(200).send(dbRes[0]))
             .catch(err => console.log('error creating superhero', err))
            // superHeroWords.push(newWord);
            // console.log(newWord);
            // res.status(200).send(`${newWord} Added`)
        // }
    },

    deleteWord: (req,res) => {
        let {name} = req.params;
        sequelize.query(`
        DELETE
        FROM superHeroWords
        WHERE name = '${name}'
        `
        ).then(dbRes=> res.status(200).send(dbRes[0])
        ).catch(err => console.log('error deleting superhero', err))

    },

    seed: (req, res) => {
        sequelize.query(`
            drop table if exists superHeroWords;

            create table superHeroWords (
                superhero_id serial primary key, 
                name varchar
            );

            insert into superHeroWords (name)
            values ('Superman'),
            ('Ironman'),
            ('Spiderman'),
            ('Batman'),
            ('Thor'),
            ('Hulk'),
            ('Captain America'),
            ('Black Widow'),
            ('Black Panther'),
            ('Ant Man'),
            ('Doctor Strange'),
            ('Hawkeye'),
            ('Falcon'),
            ('Vision'),
            ('Nick Fury'),
            ('Captain Marvel'),
            ('Shang-Chi'),
            ('Venom'),
            ('The Wasp'),
            ('Ms. Marvel'),
            ('Deadpool'),
            ('Aquaman'),
            ('Green Lantern'),
            ('The Flash'),
            ('Wolverine'),
            ('Daredevil'),
            ('Wolverine'),
            ('Wanda Maximoff');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
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