import { firestore } from "config/firebase";
import { useMemo } from "react";
import { useQueryWithPagination } from "./useQueryWithPagination";

const limit = 8;
const myChildMissingRequestQuery = "childMissingRequests";

const fetchMissingChildRequests = async cursor => {
  try {
    let documents;
    if (cursor) {
      documents = await firestore
        .collection("child")
        .orderBy("created_at", "desc")
        .startAfter(cursor)
        .limit(limit);
    } else {
      documents = await firestore
        .collection("child")
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

export function useMissingChildrenRequests() {
  const info = useQueryWithPagination(
    myChildMissingRequestQuery,
    fetchMissingChildRequests
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
