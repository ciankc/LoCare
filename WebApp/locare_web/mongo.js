// Util class for the mongodb client

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';
const LocationsCollection = "Locations";
const UsersCollection = "Users";

var state = { db: null }
var loCareDb = null;
var locations = null;
var users = null;

exports.connect = function (done) {
  if (state.db) return done()

  MongoClient.connect(url, {
    reconnectTries: 100,
    reconnectInterval: 1000
  }, function (err, db) {
    if (err) {
      return done(err)
    }

    state.db = db;
    loCareDb = db.db("LoCare");
    locations = loCareDb.collection(LocationsCollection);
    users = loCareDb.collection(UsersCollection);
    done()
  })
}

// Getter Functions from MongoDB Database
exports.getUniqueId = function (username, callback) {
  users.findOne({ username: username }, (err, res) => {
    if (res) {
      res = res.uniqueid;
    }
    callback(err, res);
  });
}

exports.getPrimaryPhoneNumber = function (username, uniqueId, callback) {
  users.findOne({ username: username, uniqueid: uniqueId }, (err, res) => {
    if (res) {
      res = res.primaryPhoneNumber;
    }
    callback(err, res);
  });
}

exports.getLatestLocation = function (uniqueId, callback) {
  locations.find({ uniqueid: uniqueId }).sort({ timestamp: -1 }).limit(1).toArray((err, res) => {
    if (res) {
      delete res.uniqueid;
    }
    callback(err, res);
  });
}

exports.getRangeLocations = function (uniqueId, timestamp1, timestamp2, callback) {
  locations.find({ uniqueid: uniqueId, timestamp: { $gt: timestamp1, $lt: timestamp2 } }).sort({ timestamp: 1 }).toArray((err, res) => {
    callback(err, res);
  })
}

exports.getRawLocations = function (uniqueId, callback) {
  locations.find({ uniqueid: uniqueId }).sort({ timestamp: 1 }).toArray((err, res) => {
    if (res) {
      res.forEach(element => {
        delete element._id;
      });
    }
    callback(err, res);
  });
}

// Inserting new things into MongoDB
exports.insertNewUser = function () {

}

exports.insertNewLocation = function () {

}

// Update functions for things already in DB
exports.updateTimestamp = function () {

}

exports.updatePrimaryPhoneNumber = function () {

}

exports.close = function (done) {
  if (state.db) {
    state.db.close(function (err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
