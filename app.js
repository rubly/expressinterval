const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 3000;

var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/intervaltimer', function (err, client) {
  if (err) throw err;

  db = client.db('intervaltimer')

  db.collection('routines').find().toArray(function (err, result) {
    if (err) throw err

    // console.log(result)
  });

});

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/routines', function(req, res) {
    db.collection('routines').find().toArray( (err, result) => {
      data = result;
      res.send(data);
    });  
  });

app.get('/routines/:id', function(req, res) {
    db.collection('routines').find({"Routinename": req.params.id}).toArray( (err, result) => {
        data = result;
        console.log(req.params);
        res.send(data);
    });  
});

app.post('/routines', function (req, res) {
    routine = req.body;
    db.collection('routines').insertOne(routine);
    res.send(routine);
});
  
app.put('/routines', function (req, res) {
    routine = req.body;
    db.collection('routines').updateOne({ Routinename: routine.Routinename}, { $set: routine} , (err, result ) => {
        if (err) throw err;
        res.send(routine);
    });
});
  
app.delete('/routines', function (req, res) {
    routine = req.body;
    console.log(routine);
    db.collection('routines').deleteOne({"Routinename": routine.Routinename});
    res.send(routine);
});


app.listen(port, () => console.log('running'));