import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from 'store/authSlice';

const API_PATH = `${process.env.REACT_APP_API_PATH}`;

export const getCards = createAsyncThunk(
  'cards/get',
  async (arg, { getState, dispatch }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await axios.get(`${API_PATH}/cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(authSlice.actions.logout());
      }
      console.log(error);
    }
  }
);

export const postCard = createAsyncThunk(
  'cards/post',
  async ({ card, onCancel }, { getState, dispatch }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await axios.post(`${API_PATH}/cards`, card, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (onCancel) {
        onCancel();
      }
      dispatch(getCards());
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(authSlice.actions.logout());
      }
      console.log(error);
    }
  }
);

export const putCard = createAsyncThunk(
  'cards/put',
  async (
    { card: { id, titulo, conteudo, lista }, onCancel },
    { getState, dispatch }
  ) => {
    try {
      const {
        auth: { token },
      } = getState();
      await axios.put(
        `${API_PATH}/cards/${id}`,
        { id, titulo, conteudo, lista },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onCancel) {
        onCancel();
      }
      dispatch(getCards());
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(authSlice.actions.logout());
      }
      console.log(error);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/delete',
  async ({ id }, { getState, dispatch }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await axios.delete(`${API_PATH}/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCards());
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(authSlice.actions.logout());
      }
      console.log(error);
    }
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
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'Error occured';
      }
    });
  },
});
export default usersSlice.reducer;
