var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export default async function handler(req, res) {
  const db = admin.firestore();
  const snapshot = await db.collection("Parents").get();
  const users = snapshot.docs.map((doc) => doc.data());
  console.log(users);

  res.status(200).json(users);
}
