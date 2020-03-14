import { useUserStore } from "../user";
import { firestore } from "config/firebase";
import { useMemo } from "react";
import { useQueryWithPagination } from "./useQueryWithPagination";

const limit = 8;

const bloodRequestQuery = "myBloodRequests";

const fetchMyBloodRequests = async (cursor, uid) => {
  let documents;
  try {
    if (cursor) {
      documents = await firestore
        .collection("blood")
        .orderBy("created_at", "desc")
        .startAfter(cursor)
        .limit(limit)
        .where("user_id", "==", uid);
    } else {
      documents = await firestore
        .collection("blood")
        .orderBy("created_at", "desc")
        .limit(limit)
        .where("user_id", "==", uid);
    }

    let documentSnapshots = await documents.get();

    let documentData = documentSnapshots.docs.map(document => ({
      ...document.data(),
      id: document.id
    }));

    let res = {
      data: documentData,
      next: documentSnapshots.docs[documentSnapshots.docs.length - 1]
    };

    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export function useMyBloodRequests() {
  const { phoneNumber } = useUserStore(state => state.user);

  const info = useQueryWithPagination(bloodRequestQuery, cursor =>
    fetchMyBloodRequests(cursor, phoneNumber)
  );

  const data = useMemo(() => {
    let data = [];
    if (info.data.length > 0) {
      info.data.forEach(d => {
        data = data.concat(d.data);
      });
    }

    return data;
  }, [info.data]);

  const loadMore = () => {
    if (info.data[info.data.length - 1].next) {
      info.fetchMore(info.data[info.data.length - 1].next);
    }
  };

  return {
    ...info,
    data,
    loadMore
  };
}
