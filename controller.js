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


const newWord = ['POST request'];

module.exports = {

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
            
            sequelize.query(`
             INSERT INTO superHeroWords(name) VALUES ('${name}') RETURNING *
             `).then(dbRes => res.status(200).send(dbRes[0]))
             .catch(err => console.log('error creating superhero', err))
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
