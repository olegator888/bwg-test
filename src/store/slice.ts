import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchQuestions } from "store/thunks";
import {
  AppData,
  AppInitPayload,
  AppState,
  SortOrder,
  SortType,
} from "types/appSlice";

const initialState: AppState = {
  search: "",
  status: "idle",
  page: 1,
  pageSize: 5,
  sortType: "activity",
  sortOrder: "desc",
  data: {
    items: [],
    total: 0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initApp(state, { payload }: PayloadAction<AppInitPayload>) {
      if (payload.sortType) {
        state.sortType = payload.sortType;
      }

      if (payload.sortOrder) {
        state.sortOrder = payload.sortOrder;
      }

      if (payload.pageSize) {
        state.pageSize = payload.pageSize;
      }

      if (payload.search) {
        state.search = payload.search;
      }
    },
    changeSearch(state, { payload }: PayloadAction<string>) {
      state.search = payload;
    },
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    changePageSize(state, { payload }: PayloadAction<number>) {
      state.pageSize = payload;
    },
    changeSortType(state, { payload }: PayloadAction<SortType>) {
      state.sortType = payload;
    },
    changeSortOrder(state, { payload }: PayloadAction<SortOrder>) {
      state.sortOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchQuestions.fulfilled,
        (state, { payload }: PayloadAction<AppData | undefined>) => {
          state.status = "idle";
          if (payload) {
            state.data = payload;
          }
        }
      );
  },
});

export const {
  initApp,
  changeSearch,
  changePage,
  changePageSize,
  changeSortType,
  changeSortOrder,
} = appSlice.actions;

export default appSlice.reducer;
