import { useEffect, useReducer, useRef } from 'react';
import { chunk } from 'helpers/utils';

const usePagination = (items, itemsPerPage = 20, category) => {
  const cacheRef = useRef({});

  const generatePaginationArray = (currentPage, totalPage) => {
    const paginationArray = [];
    if (currentPage > 1) paginationArray.push(currentPage - 1);
    paginationArray.push(currentPage);
    if (currentPage < totalPage) paginationArray.push(currentPage + 1);
    return paginationArray;
  };

  const paginationReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case 'INIT': {
        const totalPage = Math.ceil(payload.items.length / payload.itemsPerPage);
        const pageChunk = chunk(payload.items, payload.itemsPerPage);
        const data = pageChunk[state.currentPage - 1] || [];

        cacheRef.current[state.currentPage] = data;

        return {
          ...state,
          pageChunk,
          data,
          totalPage,
          totalItems: payload.items.length,
          itemsPerPage: payload.itemsPerPage,
          canNextPage: totalPage > state.currentPage,
          canPreviousPage: state.currentPage > 1,
          paginationArray: generatePaginationArray(state.currentPage, totalPage),
          from: (state.currentPage - 1) * payload.itemsPerPage + 1,
          to: Math.min(state.currentPage * payload.itemsPerPage, payload.items.length),
        };
      }
      case 'NEXT_PAGE':
      case 'PREVIOUS_PAGE':
      case 'GO_TO_PAGE': {
        const newCurrentPage = type === 'NEXT_PAGE'
          ? state.currentPage + 1
          : type === 'PREVIOUS_PAGE'
          ? state.currentPage - 1
          : payload.pageNo;

        if (newCurrentPage < 1 || newCurrentPage > state.totalPage) return state;

        const cachedData = cacheRef.current[newCurrentPage];
        if (cachedData) {
          const from = (newCurrentPage - 1) * state.itemsPerPage + 1;
          const to = Math.min(newCurrentPage * state.itemsPerPage, state.totalItems);
          return {
            ...state,
            currentPage: newCurrentPage,
            data: cachedData,
            canNextPage: newCurrentPage < state.totalPage,
            canPreviousPage: newCurrentPage > 1,
            paginationArray: generatePaginationArray(newCurrentPage, state.totalPage),
            from,
            to,
          };
        }

        const pageData = state.pageChunk[newCurrentPage - 1] || [];
        cacheRef.current[newCurrentPage] = pageData;
        return {
          ...state,
          currentPage: newCurrentPage,
          data: pageData,
          canNextPage: newCurrentPage < state.totalPage,
          canPreviousPage: newCurrentPage > 1,
          paginationArray: generatePaginationArray(newCurrentPage, state.totalPage),
          from: (newCurrentPage - 1) * state.itemsPerPage + 1,
          to: Math.min(newCurrentPage * state.itemsPerPage, state.totalItems),
        };
      }
      case 'STAY_ON_PAGE': {
        return {
          ...state,
          currentPage: payload.page
        };
      }
      default:
        return state;
    }
  };

  const [paginationState, dispatch] = useReducer(paginationReducer, {
    data: [],
    pageChunk: [],
    totalPage: 0,
    totalItems: 0,
    itemsPerPage,
    currentPage: 1,
    canNextPage: false,
    canPreviousPage: false,
    paginationArray: [],
    from: 0,
    to: 0,
  });

  useEffect(() => {
    dispatch({
      type: 'INIT',
      payload: { items, itemsPerPage }
    });
  }, [items, itemsPerPage, category]);

  return {
    paginationState,
    nextPage: () => dispatch({ type: 'NEXT_PAGE' }),
    prevPage: () => dispatch({ type: 'PREVIOUS_PAGE' }),
    goToPage: (pageNo) => dispatch({ type: 'GO_TO_PAGE', payload: { pageNo } }),
    setItemsPerPage: (no) => dispatch({
      type: 'INIT',
      payload: { items, itemsPerPage: no }
    }),
    dispatch
  };
};

export default usePagination;
