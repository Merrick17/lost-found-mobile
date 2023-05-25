import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import CategoryReducer from './reducers/category.reducer';
import UserReducer from './reducers/user.reducer';
import postReducer from './reducers/posts.reducer';
import itemReducer from './reducers/userItems.reducer';
import messagesReducer from './reducers/messages.reducer';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
  reducer: {
    users: UserReducer,
    auth: authReducer,
    category: CategoryReducer,
    posts: postReducer,
    userItems: itemReducer,
    messages: messagesReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
