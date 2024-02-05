import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { Login, MyToken, Register } from "../../models/Authentication";
import authenticationService, { activateAccount } from "./authenticationAPI";
import { jwtDecode } from 'jwt-decode';


export interface AuthenticationState
{
    userName: string | null,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean,
    isLogged: boolean,
    access: string | null,
    refresh: string | null,
    is_staff: Boolean,
    message: string,

    userActived: boolean,
}


const initialState: AuthenticationState =
{
    userName: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    isLogged: true,
    access: "",
    refresh: "",
    is_staff: false,
    message: "",

    userActived: false
};



export const activateAccountAsync = createAsyncThunk(
    "authentication/activateAccount",
    async (token: string) => {
      const response = await activateAccount(token);
      return response;
    }
  );



export const registerAsync = createAsyncThunk("authentication/register", async (user: Register, thunkAPI) => {
    try {
        const response = await authenticationService.register(user);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});



export const loginAsync = createAsyncThunk("authentication/login", async (user: Login) =>
{
        return await authenticationService.login(user)
})


export const logoutAsync = createAsyncThunk('auth/logout',
 async () =>
 {
    // localStorage.setItem('previousPath', window.location.pathname);
    authenticationService.logout()
 })



export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        reset: (state) =>
        {
        state.isSuccess = false;
        state.isLoading = false;
        state.isLogged = false;
        if (localStorage.getItem("is_staff") === "true") {
            state.is_staff = false
          }
        },

        LoggedOff: (state) =>
        {
            state.isLogged = false
        },
      
        LoggedOn: (state) => {
            state.isLogged = true
            state.userName = localStorage.getItem('userName') as string
        },

        staffCheck: (state) =>
        {
            if (localStorage.getItem("is_staff") === "true") {
              state.is_staff = true
            }
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerAsync.rejected, (state, action) =>
        {
            state.isError = true
            state.message = action.payload as string
        })
        .addCase(registerAsync.pending, (state) =>
        {
            state.isLoading = true
        })
        .addCase(registerAsync.fulfilled, (state, action) =>
        {
            state.isLoading = false
            state.isSuccess = true
            state.userName = action.payload.data
        })


        .addCase(loginAsync.pending, (state) =>
        {
            state.isLoading = true
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            const decoded: MyToken = jwtDecode(action.payload.access)
        
            state.userName = decoded.username
            state.is_staff = decoded.is_staff
            localStorage.setItem('userName', decoded.username)
            localStorage.setItem('is_staff', JSON.stringify(decoded.is_staff))
            JSON.stringify(action.payload.access)
            state.access = action.payload.access
            state.isLoading = false;
            state.isSuccess = true;
            state.isLogged = true;
            state.isError = false;
        })

        .addCase(loginAsync.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        // .addCase(logoutAsync.fulfilled, (state) =>
        // {
        //     state.userName = ""
        //     state.isLogged = false
        //     state.access = ""
        // });

        .addCase(logoutAsync.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.isLogged = false;
            state.userName = "";
            state.access = "";
            state.isError = false;
            state.isSuccess = false;

            localStorage.removeItem('is_staff');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('token');

            window.location.href = "/"
        })
        .addCase(logoutAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })

        .addCase(activateAccountAsync.fulfilled, (state, action) => {
            state.userActived = true
        })
        .addCase(activateAccountAsync.rejected, (state, action) => {
            state.userActived = true
        });
    }

})


export const selectAccess = (state: RootState) => state.authentication.access;
export const selectUser = (state: RootState) => state.authentication.userName;
export const selectIsLogged = (state: RootState) => state.authentication.isLogged;
export const selectIsLoading = (state: RootState) => state.authentication.isLoading;
export const selectIsError = (state: RootState) => state.authentication.isError;
export const selectIsSuccess = (state: RootState) => state.authentication.isSuccess;
export const selectIsStaff = (state: RootState) => state.authentication.is_staff;

export const { reset, LoggedOff, LoggedOn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
