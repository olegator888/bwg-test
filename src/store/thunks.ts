import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "api";
import { AppData } from "types/appSlice";
import { ThunkConfig } from "types/thunkApi";

export const fetchQuestions = createAsyncThunk<
  AppData | undefined,
  undefined,
  ThunkConfig
>("fetchQuestions", async (_, thunkApi) => {
  try {
    const { getState } = thunkApi;

    const {
      page,
      pageSize,
      search,
      sortType: sort,
      sortOrder: order,
    } = getState();

    if (!search) {
      return {
        items: [],
        has_more: false,
      };
    }

    const [{ data }, { data: totalData }] = await Promise.all([
      axios.get<AppData>("search/advanced", {
        params: {
          q: search || undefined,
          page,
          pageSize,
          sort,
          order,
        },
      }),
      axios.get<{ total: number }>("search/advanced", {
        params: {
          q: search || undefined,
          filter: "total",
        },
      }),
    ]);

    if (!data || !totalData) {
      return {
        items: [],
        has_more: false,
        total: 0,
      };
    }

    return {
      items: data.items,
      has_more: data.has_more,
      total: totalData.total,
    };
  } catch (e) {
    console.log(e);
    message.error("Ошибка при загрузке вопросов");
  }
});
