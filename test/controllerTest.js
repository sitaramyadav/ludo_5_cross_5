var app = require('../library/controller');
var request = require('supertest');

describe("controller", function() {
  describe('GET /',function(){
    it('should serve the login page',function(done){
          request(app)
          .get('/')
          .expect(200,done);
      });
  });
  describe("POST /addGame", function() {
    it("adds a new game and adds a player ie, creator", function(done) {
      request(app)
        .post('/addGame')
        .set('cookie', "name=alex")
        .send("gameSize=4")
        .expect('{"success":true}', done);
    });
  });
  describe("POST /joinGame", function() {
    it("adds a new player to the given game", function(done) {
      request(app)
        .post('/joinGame')
        .set('cookie', "name=supertramp")
        .send('gameId=1')
        .expect('{"success":true}', done);
    });
  });
  describe("GET /getGames",function(){
    it("serves json with all games with filtered keys",function(done){
      request(app)
        .get('/getGames')
        .expect('Content-Type',/json/)
        .expect(200)
        .expect('[{"id":1,"no_of_players":4,"joined":2}]',done);
    });
  });
});
