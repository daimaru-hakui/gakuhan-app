import * as functions from "firebase-functions";

import { onDocumentDeleted } from "firebase-functions/v2/firestore";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const db = getFirestore();

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
      signature: "",
    });
  } catch (e) {
    console.log(e);
  }
});

export const deleteImage = onDocumentDeleted("media/{docId}", (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data");
  }
  const data = snapshot?.data() as { path: string };
  getStorage().bucket().file(data.path).delete();
});
