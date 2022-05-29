import { createSlice } from '@reduxjs/toolkit';
import {
   fetchContacts,
   addContact,
   deleteContact,
   changeContact,
} from './contacts-operations';

const initialState = {
   contacts: [],
   isLoading: false,
   isRefreshing: false,
};

const contactsSlice = createSlice({
   name: 'contacts',
   initialState,
   extraReducers: {
      [addContact.pending](state) {
         state.isRefreshing = true;
      },
      [addContact.fulfilled](state, action) {
         state.contacts.push(action.payload);
         state.isRefreshing = false;
      },
      [addContact.rejected](state) {
         state.isRefreshing = false;
      },
      [fetchContacts.pending](state) {
         state.isLoading = true;
      },
      [fetchContacts.fulfilled](state, action) {
         state.contacts = action.payload;
         state.isLoading = false;
      },
      [fetchContacts.rejected](state) {
         state.isLoading = false;
      },

      [deleteContact.fulfilled](state, action) {
         state.contacts = state.contacts.filter(
            ({ id }) => id !== action.payload
         );
      },

      [changeContact.fulfilled](state, action) {
         state.contacts = [...state].contacts.map(
            contact =>
               contact.id === action.payload.id &&
               ((contact.name = action.payload.name),
               (contact.number = action.payload.number))
         );
      },
   },
});

export default contactsSlice.reducer;
