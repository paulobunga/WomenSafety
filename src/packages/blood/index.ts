import { firestore as db } from "config/firebase";
import firestore from "@react-native-firebase/firestore";

interface IBloodRequest {
  type: string;
  address: string;
  contact: string;
  user_id: string;
}

async function onSubmitBloodRequest(req: IBloodRequest) {
  return db.collection("blood").add({
    ...req,
    created_at: firestore.Timestamp.now()
  });
}

async function onRemoveBloodRequest(req: { id: any }) {
  return db
    .collection("blood")
    .doc(req.id)
    .delete();
}

export const bloodService = {
  onSubmitBloodRequest,
  onRemoveBloodRequest
};
