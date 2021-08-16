import { ParametersStore } from '@store';

export const sharedTemplate = () => {
  const { tsCheck } = ParametersStore;
  return `
 /* eslint-disable */
 ${tsCheck ? '' : '// @ts-nocheck'}
 // *******************************************************
 // *******************************************************
 //
 // GENERATED FILE, DO NOT MODIFY
 //
 // Made by Victor Garcia ®
 //
 // https://github.com/victorgarciaesgi
 // *******************************************************
 // *******************************************************
 // 💙
 
 export type Maybe<T> = T | null;
 `;
};
