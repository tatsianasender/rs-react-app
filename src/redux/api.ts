import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person, PersonDetails } from '../types/types';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      { results: Person[]; count: number },
      { page: number; searchTerm?: string }
    >({
      query: ({ searchTerm, page }) =>
        searchTerm
          ? `?search=${searchTerm.trim()}&page=${page}`
          : `?page=${page}`,
    }),
    getPerson: builder.query<PersonDetails, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
