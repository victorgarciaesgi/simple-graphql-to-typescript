// *******************************************************
// *******************************************************
//
// GENERATED FILE, DO NOT MODIFY
//
// Made by Victor Garcia ®
// https://github.com/victorgarciaesgi
// *******************************************************
// *******************************************************

export interface IRootQueryType {
  post?: IPost;
  posts?: IPost[];
  comment?: IComment;
  comments?: IComment[];
  album?: IAlbum;
  albums?: IAlbum[];
  photo?: IPhoto;
  photos?: IPhoto[];
  todo?: ITodo;
  todos?: ITodo[];
  user?: IUser;
  users?: IUser[];
}

export interface IPost {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface IComment {
  post?: IPost;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}

export interface IAlbum {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
}

export interface IPhoto {
  album?: IAlbum;
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface ITodo {
  user?: IUser;
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}
