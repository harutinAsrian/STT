import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getData, addItem, removeItem, updateItem } from '../../api/calls'

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export const getConfigureData = createAsyncThunk('config/get', async (_, thunkApi) => {
  try {
    const res = await getData();
    return res;
  } catch (e) {
    return thunkApi.rejectWithValue()
  }
})

export const createConfigureItem = createAsyncThunk('config/create', async (body, thunkApi) => {
  try {
    const res = await addItem(body);
    thunkApi.dispatch(getConfigureData())
    return res;
  } catch (e) {
    return thunkApi.rejectWithValue(false)
  }
})

export const removeConfigureItem = createAsyncThunk('config/remove', async (id, thunkApi) => {
  try {
    await removeItem(id);
    thunkApi.dispatch(getConfigureData())
  } catch (e) {
    return thunkApi.rejectWithValue(false)
  }
})

export const updateConfigureItem = createAsyncThunk('confifadsg/upadate', async ({ id, data }, thunkApi) => {
  try {
    const res = await updateItem(id, data);
    thunkApi.dispatch(getConfigureData())
    return res;
  } catch (e) {
    thunkApi.rejectWithValue(false)
  }
})


const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getConfigureData.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.data = action.payload
    })
    builder.addCase(getConfigureData.pending, (state,) => {
      state.isLoading = true
    })
    builder.addCase(getConfigureData.rejected, (state, action) => {
      state.isLoading = false
      // state.error = action.payload
    })
  },
})


export const { dataFetching, dataFetchingSuccess, dataFetchingError, } = dataSlice.actions
export default dataSlice.reducer