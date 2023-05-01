import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import CategoryReducer from "./reducers/category.reducer";
import UserReducer from "./reducers/user.reducer";
import postReducer from "./reducers/posts.reducer";

export const store = configureStore({
  reducer: { users: UserReducer, auth: authReducer, category: CategoryReducer, posts: postReducer },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch