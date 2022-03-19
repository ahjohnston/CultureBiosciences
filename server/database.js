const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const photoData = require('./data.js')

let imageSchema = mongoose.Schema(
  {
    url: String,
    lastModified: String,
    status: String
  },
  { timestamps: true }
);

let Image = mongoose.model('Image', imageSchema)

async function getImages(input, callback) {
  var select = {}
  if (input.status && input.status !== 'all') select.status = input.status
  if (input.id) select._id = input.id
  Image.find(select).limit(Number(input.limit)).skip(Number(input.skip))
    .then((result) => {
      return callback(null, result)
    })
    .catch((err) => {
      return callback(err)
    })
}

function updateStatus(id, status, callback) {
  Image.findOneAndUpdate({ _id: id },
    { $set: { status: status } },
    { new: true })
    .then((result) => {
      callback(null, result)
    })
}

module.exports.getImages = getImages;
module.exports.updateStatus = updateStatus;
