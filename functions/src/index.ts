import * as functions from "firebase-functions";

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const db = getFirestore();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const processSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    role: "user",
  };
  if (user.email && user.email === "mukai@daimaru-hakui.co.jp") {
    customClaims.role = "admin";
  } else if (user.email && user.email.endsWith("@daimaru-hakui.co.jp")) {
    customClaims.role = "member";
  } else {
    customClaims.role = "user";
  }
  try {
    await getAuth().setCustomUserClaims(user.uid, customClaims);
    if (user.providerData.length === 0) return;
    const userRef = db.doc(`users/${user.uid}`);
    await userRef.set({
      createdAt: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      email: user.email,
    });
  } catch (e) {
    console.log(e);
  }
});
