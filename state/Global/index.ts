import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  selectedText?: string | null;
  pending?: boolean;
  error?: boolean;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  newChatId:string
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  newChatId:"",
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    updateLastMessage(state, action: PayloadAction<Partial<Message>>) {
      const last = state.messages[state.messages.length - 1];
      if (last) {
        Object.assign(last, action.payload);
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setNewChatId(state,action:PayloadAction<string>){
      state.newChatId=action.payload
    }
  },
});

export const { addMessage, updateLastMessage, setLoading, setMessages , setNewChatId } = chatSlice.actions;
export default chatSlice.reducer;
