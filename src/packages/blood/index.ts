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
    createdAt: firestore.Timestamp.now()
  });
}

export const bloodService = {
  onSubmitBloodRequest
};
