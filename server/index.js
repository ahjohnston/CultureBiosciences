const express = require('express');
const app = express();
const PORT = 5543;

app.use(express.static('client/dist'));

app.listen(PORT, () =>{
  console.log(`Virginia hears you at port ${PORT}`)
})