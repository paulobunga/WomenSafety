import { useUserStore } from "../user";
import { firestore } from "config/firebase";
import { queryCache, useInfiniteQuery } from "react-query";
import { useMemo } from "react";

const limit = 8;
const myChildMissingRequestQuery = "myChildMissingRequests";

export const refetchMyChildMissingRequest = () => {
  queryCache.refetchQueries(myChildMissingRequestQuery);
};

const fetchMyChildRequests = async (key, cursor, uid) => {
  let documents;
  if (cursor) {
    documents = await firestore
      .collection("child")
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(limit)
      .where("userId", "==", uid);
  } else {
    documents = await firestore
      .collection("child")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .where("userId", "==", uid);
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
};

export function useMyMissingChildRequests() {
  const { uid } = useUserStore(state => state.user);

  const info = useInfiniteQuery(
    "myChildMissingRequestQuery",
    (key, cursor) => fetchMyChildRequests(key, cursor, uid),
    {
      getFetchMore: lastGroup => lastGroup.next
    }
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
    if (info.canFetchMore) {
      info.fetchMore(info.data[info.data.length - 1].next);
    }
  };

  return {
    ...info,
    data,
    loadMore
  };
}
