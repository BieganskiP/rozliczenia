import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "@/zod/userSchema";

const initialState: User = {
  car: "",
  id: 0,
  role: "",
  name: "",
  email: "",
  region: "",
  wage: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const validationResult = UserSchema.safeParse(action.payload);
      if (validationResult.success) {
        return validationResult.data;
      }
      console.error("Failed user validation", validationResult.error);
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
