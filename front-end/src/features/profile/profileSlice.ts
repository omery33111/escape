import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProfileState } from '../../models/Profile';
import { getProfile } from './profileAPI';



const initialState: ProfileState = {
  profile: { id: 0, username: '', date: '', activated: false, activation_token: ""},
  profiles: [],
  
  isLoading: false,
  isError: false
};



export const getProfileAsync = createAsyncThunk(
  "profile/getProfile",
  async () => {
    const response = await getProfile();
    return response;
  }
);



export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    do: (state, action) => {
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.isLoading = false;
    })
    .addCase(getProfileAsync.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProfileAsync.rejected, (state) => {
      state.isError = true;
    })
  },
});



export const selectProfileIsLoading = (state: RootState) => state.profile.isLoading;
export const selectProfileIsError = (state: RootState) => state.profile.isError;

export const selectMyProfile = (state: RootState) => state.profile.profile;



export default profileSlice.reducer;
