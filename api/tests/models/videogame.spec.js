const { conn } = require('../../src/db.js');
const Videogame = require('../../src/models/Videogame')
const Genre = require('../../src/models/Genre')
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
/*     beforeEach(() => Videogame.sync({ force: true })); */
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Genre.create({ name: 'Super Mario Bros' });
      });
    });
  });
});
