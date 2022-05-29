import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
   reducerPath: 'contactsApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://628f7f710e69410599dd87fb.mockapi.io/api/v1',
   }),
   tagTypes: ['Contacts'],
   endpoints: builder => ({
      fetchContacts: builder.query({
         query: () => '/contacts',
         providesTags: ['Contacts'],
      }),
      addContact: builder.mutation({
         query: ({ name, phone }) => ({
            url: '/contacts',
            method: 'POST',
            body: { name, phone },
         }),
         invalidatesTags: ['Contacts'],
      }),
      deleteContact: builder.mutation({
         query: contactId => ({
            url: `/contacts/${contactId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Contacts'],
      }),
   }),
});

export const {
   useFetchContactsQuery,
   useAddContactMutation,
   useDeleteContactMutation,
} = contactsApi;
