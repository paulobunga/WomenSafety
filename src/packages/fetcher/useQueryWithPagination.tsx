import { useReducer, useEffect } from "react";

const actions = {
  loading: "loading",
  loadingMore: "loadingMore",
  error: "error",
  success: "success",
  loadMoreSuccess: "loadMoreSuccess"
};

const initialState = {
  status: "idle",
  data: [],
  error: null
};

const reducer = (state, action) => {
  console.log("man", action.type, actions);
  if (action.type === actions.loading) {
    return { ...state, status: "loading" };
  } else if (action.type === actions.loadingMore) {
    return { ...state, status: "loadingMore" };
  } else if (action.type === actions.error) {
    return { ...state, status: "error", error: action.payload };
  } else if (action.type === actions.success) {
    return {
      ...state,
      status: "success",
      data: [action.payload]
    };
  } else if (action.type === actions.loadMoreSuccess) {
    return {
      ...state,
      status: "success",
      data: [...state.data, action.payload]
    };
  }

  return state;
};

type Ifetcher = (cursor?: any) => Promise<any>;

export function useQueryWithPagination(key: string, fetcher: Ifetcher) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function refetch() {
    if (state.status === "loading") {
      return;
    }

    try {
      dispatch({ type: actions.loading });
      const data = await fetcher();
      dispatch({ type: actions.success, payload: data });
    } catch (error) {
      dispatch({ type: actions.error, payload: error });
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  const fetchMore = async cursor => {
    if (state.status === "loading" || state.status === "loadingMore") {
      return;
    }

    try {
      dispatch({ type: actions.loadingMore });
      const data = await fetcher(cursor);
      dispatch({ type: actions.loadMoreSuccess, payload: data });
    } catch (e) {
      dispatch({ type: actions.error, payload: e });
    }
  };

  return {
    ...state,
    fetchMore,
    refetch
  };
}

// switch (action.type) {
//   case [actions.loading]:
//     return { ...state, status: "loading" };
//   case [actions.loadingMore]:
//     return { ...state, status: "loadingMore" };
//   case [actions.error]:
//     return { ...state, status: "error", error: action.payload };
//   case [actions.success]: {
//     console.log("oh boi2");
//     return {
//       ...state,
//       status: "success",
//       data: action.payload
//     };
//   }

//   case [actions.loadMoreSuccess]:
//     return {
//       ...state,
//       status: "success",
//       data: [...state.data, ...action.payload]
//     };
//   default: {
//     console.log("bhadwa ", action.type);
//     return state;
//   }
// }
