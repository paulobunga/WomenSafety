import React, { useReducer, useEffect } from "react";

const actions = {
  loading: "loading",
  loadingMore: "loadingMore",
  error: "error",
  success: "success"
};

const initialState = {
  status: "idle",
  data: [],
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case [actions.loading]:
      return { ...state, status: "loading" };
    case [actions.loadingMore]:
      return { ...state, status: "loadingMore" };
    case [actions.error]:
      return { ...state, status: "error", error: action.payload };
    case [actions.success]:
      return {
        ...state,
        status: "success",
        data: [...state.data, ...action.payload]
      };
    default:
      return state;
  }
};

interface Iparams {
  fetcher: () => Promise<any>;
}

function useQueryWithPagination({ fetcher }: Iparams) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetcher();
        dispatch({ type: [actions.success], payload: data });
      } catch (error) {
        dispatch({ type: [actions.error], payload: error });
      }
    }
    dispatch({ type: [actions.loading] });
  }, []);
}
