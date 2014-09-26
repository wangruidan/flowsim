var uuid = require('node-uuid');
var mocha = require('mocha');
var assert = require('assert');

var pg = require('../../database/pg');
var st = require('./../storage');

var db = new pg.Database({database:{
  user: 'flogdev',
  pwd: 'flogdev',
  host: 'localhost',
  database: 'flowsim'
}});

var store = new st.Storage(db);

function genString(n){
  var y = '';
  for(i=0;i<n;i++) y+= 'a';
  return y;
}
describe('Storage', function(){
describe('.createSubscriber(email, password, date, ip, token, cb)', function(){
// Create test subscriber
var d = new Date();
var dISO = d.toISOString();
var ts = { email: 'testSub@mail.com', password: '123', 
    date: dISO, ip: '1.1.1.1', token: uuid.v4() } 

  // Delete all subscribers from db before running tests
  before(function(){
    db.delete('subscriber', {}, function(err, result){
      if(err){
        console.log('delete all subscribers error:', err);
      } else {
       }
    });
  });

  it('should return [] on successful insert', function(done){
    store.createSubscriber(ts.email, ts.password, ts.date, ts.ip, ts.token, 
      function(err, result){
        if(err){
          console.log('createSub error', err);
        } else {
          assert.equal(0, result.length);
          done();
        }
    });
   });

  it('should return error code 23505 for duplicate insert', function(done){
    store.createSubscriber(ts.email, ts.password, ts.date, ts.ip, ts.token, 
      function(err, result){
          assert.equal('23505', err.code);
          done();
    });
   });
   it('should return error code 22001 for email length greater than 128', 
     function(done){
     store.createSubscriber(genString(129), ts.password, ts.date, ts.ip, uuid.v4(),
      function(err, result){
          assert.equal('22001', err.code);
          done();
     });
   });

  it('should return error code 22P02 for invalid IP address syntax',
      function(done){
      store.createSubscriber(ts.email, ts.password, ts.date, '01.1.1', uuid.v4(),
        function(err, result){
          assert.equal('22P02', err.code);
          done();
        });
  });
          
  it('should return error code 22P02 for invalid IP address type',
      function(done){
      store.createSubscriber(ts.email, ts.password, ts.date, 10 , uuid.v4(),
        function(err, result){
          assert.equal('42804', err.code);
          done();
        });
  });

  it('should return error code 22001 for token length greater than 36',
    function(done){
    store.createSubscriber('b@b', ts.password, ts.date, ts.ip, genString(37),
      function(err, result){
        assert.equal('22001', err.code);
        done();
    });
  });

  it('should return error code 22023 for invalid date type',
    function(done){
    store.createSubscriber('c@c', ts.password, new Date(), ts.ip, genString(37),
      function(err, result){
        assert.equal('22023', err.code);
        done();
    });
  });
});
});
/*
store.getSubscriberByToken(ts.token, function(err, result){
  if(err){
    console.log('fetch error:', err);
  } else {
    console.log('fetch by token:', result);
  }
});

store.getSubscriberByEmail('test@mail' , function(err, result){
  if(err){
    console.log('fetch by email error: ', err);
  } else {
    console.log('fetch by email test@mail: ', result);
  }
});

console.log('test sub', ts);
*/
db.close();  
