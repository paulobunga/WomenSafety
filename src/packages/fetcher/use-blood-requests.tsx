import { firestore } from "config/firebase";
import { useQueryWithPagination } from "./useQueryWithPagination";
import { useMemo } from "react";

const limit = 8;

const bloodRequestQuery = "bloodRequests";

const fetchBloodRequests = async cursor => {
  let documents;
  try {
    if (cursor) {
      documents = await firestore
        .collection("blood")
        .orderBy("created_at", "desc")
        .startAfter(cursor)
        .limit(limit);
    } else {
      documents = await firestore
        .collection("blood")
        .orderBy("created_at", "desc")
        .limit(limit);
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

export function useBloodRequests() {
  const info = useQueryWithPagination(bloodRequestQuery, fetchBloodRequests);

  const loadMore = () => {
    if (info.data[info.data.length - 1].next) {
      info.fetchMore(info.data[info.data.length - 1].next);
    }
  };

  const data = useMemo(() => {
    let data = [];
    if (info.data.length > 0) {
      info.data.forEach(d => {
        data = data.concat(d.data);
      });
    }

    return data;
  }, [info.data]);

  return {
    ...info,
    data,
    loadMore
  };
}
