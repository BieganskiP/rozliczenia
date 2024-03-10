import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserSchema } from "@/zod/userSchema";
import { RegistrySchema } from "@/zod/registrySchema";
import { InviteSchema } from "@/zod/inviteSchema";

// const urlLink = "https://cl-ds.up.railway.app"
const urlLink = "http://localhost:3001";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: urlLink,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => "/auth/current-user",
      transformResponse: (response: any) => UserSchema.parse(response),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),
    getAllRegistries: builder.query({
      query: () => "/registry",
      transformResponse: (response: any) => RegistrySchema.parse(response),
    }),
    getRegistryByCriteria: builder.query({
      query: ({ userId, startDate, endDate }) => ({
        url: `/registry/search?user_id=${userId}&startDate=${startDate}&endDate=${endDate}`,
      }),
      // Assuming you have a schema or want to add a transformResponse
    }),
    getRegistryById: builder.query({
      query: (id) => `/registry/${id}`,
      // Add transformResponse if necessary
    }),
    createRegistry: builder.mutation({
      query: (createRegistryDto) => ({
        url: "/registry",
        method: "POST",
        body: createRegistryDto,
      }),
      // Add transformResponse if necessary
    }),
    deleteRegistry: builder.mutation({
      query: (id) => ({
        url: `/registry/${id}`,
        method: "DELETE",
      }),
      // Add transformResponse if necessary
    }),
    getRegistriesByUserId: builder.query({
      query: (userId) => `/registry/by-user/${userId}`,
      // Add transformResponse if necessary
    }),
    getInvite: builder.query({
      query: (invitationId) => `/invitations/${invitationId}`,
      //   transformResponse: (response: any) => InviteSchema.parse(response),
    }),
    getUsers: builder.query({
      query: () => "/auth",
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "DELETE",
      }),
    }),
    sendInvite: builder.mutation({
      query: ({ email }) => ({
        url: "/invitations/send-invite",
        method: "POST",
        body: { email },
      }),
    }),
    deleteInvitation: builder.mutation({
      query: (id) => ({
        url: `/invitations/delete-invite/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCurrentUserQuery,
  useSignoutMutation,
  useGetInviteQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useSendInviteMutation,
  useDeleteInvitationMutation,
  useGetAllRegistriesQuery,
  useGetRegistryByCriteriaQuery,
  useGetRegistryByIdQuery,
  useCreateRegistryMutation,
  useDeleteRegistryMutation,
  useGetRegistriesByUserIdQuery,
} = apiSlice;
