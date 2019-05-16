// *******************************************************
// *******************************************************
//
// GENERATED FILE, DO NOT MODIFY
//
// Made by Victor Garcia ®
// https://github.com/victorgarciaesgi
// *******************************************************
// *******************************************************

export interface RootQueryType {
  post?: Post;
  posts?: Post[];
  comment?: Comment;
  comments?: Comment[];
  album?: Album;
  albums?: Album[];
  photo?: Photo;
  photos?: Photo[];
  todo?: Todo;
  todos?: Todo[];
  user?: User;
  users?: User[];
}

export interface Post {
  user?: User;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Comment {
  post?: Post;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}

export interface Album {
  user?: User;
  userId?: number;
  id?: number;
  title?: string;
}

export interface Photo {
  album?: Album;
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface Todo {
  user?: User;
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}
