import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_PATH = `${process.env.REACT_APP_API_PATH}`;

export const getCards = createAsyncThunk(
  'cards/get',
  async (arg, { getState }) => {
    const {
      auth: { token },
    } = getState();
    const response = await axios.get(`${API_PATH}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const postCard = createAsyncThunk(
  'cards/post',
  async ({ title, content, list }, { getState }) => {
    const {
      auth: { token },
    } = getState();
    const response = await axios.post(
      `${API_PATH}/cards`,
      {
        titulo: title,
        conteudo: content,
        lista: list,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCards.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        if (action.payload) {
          state.data = action.payload;
          state.loading = 'idle';
        } else {
          state.loading = 'idle';
          state.error = 'Unauthorized';
        }
      }
    });
    builder.addCase(getCards.rejected, (state, action) => {
      debugger;
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'Error occured';
      }
    });
  },
});
export default usersSlice.reducer;
