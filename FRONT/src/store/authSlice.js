import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_PATH = `${process.env.REACT_APP_API_PATH}`;

export const login = createAsyncThunk(
  'auth/login',
  async ({ user, password }) => {
    const response = await axios.post(`${API_PATH}/login`, {
      login: user,
      senha: password,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'users',
  initialState: {
    token: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null
      localStorage.setItem('TOKEN_KEY', '')
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.token = action.payload;
        state.loading = 'idle';
        localStorage.setItem('TOKEN_KEY', JSON.stringify(action.payload))
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'Error occured';
      }
    });
  },
});

export default authSlice.reducer;
