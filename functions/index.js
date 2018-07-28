const functions 				= require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin 						= require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.gleanRequest = functions.database.ref('openRequests/{userID}/{requestID}')
	.onCreate((snap, context) => {
	if (context.authType === 'USER') {
		var requestContent = snap.val();
  }
});
