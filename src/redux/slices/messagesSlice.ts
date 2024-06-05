import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessagesState {
  content: string;
}

const initialState: MessagesState = {
  content: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      localStorage.setItem('messages', JSON.stringify(action.payload));
    },
    initializeMessage: (state) => {
      const storedMessage = localStorage.getItem('messages');
      if (storedMessage) {
        state.content = JSON.parse(storedMessage);
      }
    },
  },
});

export const { setMessage, initializeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
