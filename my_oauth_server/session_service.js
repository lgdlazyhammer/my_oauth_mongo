//import mongoose
var mongoose = require('mongoose');
//connect to db
var db = require('./mongodb_connection.js').db();

var OAuthSessionSchema = new mongoose.Schema({ uuid:String, session:String, expires:String });
	
var OAuthSessionModel = db.model('OAuthSession',OAuthSessionSchema);

module.exports.getOAuthSession = function(ID, CALLBACK){	

	OAuthSessionModel.find({uuid:ID}, function(err, data){ console.log('get session data failed!'+err);CALLBACK(data);});
}

module.exports.save = function(OAuthSession, CALLBACK){	
    
	var OAuthSessionEntity = new OAuthSessionModel({uuid:OAuthSession.getUuid(),session:OAuthSession.getSession(),expires:OAuthSession.getExpires()});
	OAuthSessionEntity.save(function(err){ CALLBACK(err); });
}

module.exports.remove = function(ID,CALLBACK){	
    
	OAuthSessionModel.remove({ uuid: ID }, function (err) {
	  if (err) CALLBACK(err);
	  // removed!
	});
}