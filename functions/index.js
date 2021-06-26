const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const cors = require("cors");
const express = require("express");
const app = express();
const db = admin.firestore();
const accountSid = "ACd193fd48adf06b47285e017061a75cba";
const authToken = "27220c299034f0e68bfd583c77c2c305";
const client = require("twilio")(accountSid, authToken);
const webPush = require("web-push");
const publicVapidKey =
  "BAafEdcGskwyzmCy6CfDZbLRJjaq-wUlHd34h23mWAUkqrDAInrwo03SMJQ0OrkBqodFUamAgns_TIYKf8AqLAU";
const privateVapidKey = "_QF5rXQtVwU5T7wS2b7AvFVpNj3W6eHtu0-Z1r6Vi4M";
webPush.setVapidDetails(
  "mailto:robinson@mydicoin.com",
  publicVapidKey,
  privateVapidKey
);


app.use(cors());


app.post("/ticket", async (request, response) => {
  // const drinkId = request.body.drinkId;
  // const personId = request.body.personId;



    // send text message twillio
    try {
      await client.messages.create({
        body: `Heads up!  has requested a ticket`,
        from: "+12109780788",
        to: "+12259333884",
      });
      // // adjust qty
      // await db
      //   .collection("mirabella/party/drinks")
      //   .doc(drinkId)
      //   .update({
      //     name: drink.data().name,
      //     description: drink.data().description,
      //     qty: drink.data().qty - 1,
      //   });
      console.log("success sent");
    } catch (error) {
      console.log("something terrible has happend");
      console.log(error);
    }
  response.send({message:"hello moto"});
});

exports.maintenance = functions.https.onRequest(app);
