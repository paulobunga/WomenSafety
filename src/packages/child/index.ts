import { firestore as db, storage } from "config/firebase";
import firestore from "@react-native-firebase/firestore";
import { IChild } from "src/types";

async function onSubmitMissingChildren(req: IChild) {
  return new Promise((resolve, reject) => {
    const uploadTask = storage
      .ref("missing-children/" + new Date().getTime())
      .putFile(req.image);

    uploadTask.on(
      "state_changed",
      () => {},
      () => {
        reject("Something went wrong");
      },
      async () => {
        const downloadURI = await uploadTask._ref.getDownloadURL();
        console.log("download uri", downloadURI);
        try {
          await db.collection("child").add({
            ...req,
            image: downloadURI,
            created_at: firestore.Timestamp.now()
          });
          resolve();
        } catch (e) {
          reject("Something went wrong");
        }
      }
    );
  });
}

async function onRemoveChildMissingRequest(req: { id: any }) {
  return db
    .collection("child")
    .doc(req.id)
    .delete();
}

export const childService = {
  onSubmitMissingChildren,
  onRemoveChildMissingRequest
};
