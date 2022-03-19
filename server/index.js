const express = require('express');
const app = express();
const { getImages, updateStatus } = require('./database.js');
const PORT = 4600;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())


app.get('/images', function (req, res) {
  getImages(req.query, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/images', function (req, res) {
  updateStatus(req.query.id, req.query.status, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Virginia hears you at port ${PORT}`)
})