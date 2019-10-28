/* eslint-disable */
/* tslint-disable */
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

export interface Query {
  _empty?: string;
  me: User;
  emailExists: boolean;
  getCurrentGoal?: Goal;
  getLastTrainings: TrainingConnection;
  getTrainings: TrainingConnection;
  getMonthlyCalendarActivities: CalendarActivity[];
}

export interface User {
  uuid: string;
  name: string;
  surname: string;
  profilePicture?: string;
  email: string;
  birth: undefined;
  gender: UserGender;
  weight: number;
  height: number;
  location: string;
}

export interface EmailExistsInput {
  email: string;
}

export interface Goal {
  uuid: string;
  trainings: number;
  kcal: number;
  points: number;
  currentTrainings: number;
  currentKcal: number;
  currentPoints: number;
}

export interface TrainingConnection {
  pageInfo: PageInfo;
  edges: TrainingEdge[];
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface TrainingEdge {
  node: Training;
}

export interface Training {
  uuid: string;
  title: string;
  time: number;
  points: number;
  kcal: number;
  pictureUrl?: string;
  likes: number;
  hasLiked: boolean;
  exercises: Exercise[];
}

export interface Exercise {
  uuid: string;
  title: string;
  pictureUrl: string;
  descriptions: string[];
  position: number;
}

export interface CalendarActivity {
  date: undefined;
  training?: Training;
}

export interface Mutation {
  _empty?: string;
  login: LoginPayload;
  loginWithFacebook: LoginPayload;
  register: LoginPayload;
  registerWithFacebook: LoginPayload;
  forgotPassword?: boolean;
  resetPassword: LoginPayload;
  createGoal: Goal;
  createTraining: Training;
  completeTraining: Training;
  setTrainingReaction: Training;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginPayload {
  user: User;
  token: string;
}

export interface RegisterInput {
  name: string;
  surname: string;
  birth: undefined;
  gender: UserGender;
  weight: number;
  height: number;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
}

export interface RegisterFacebookInput {
  name: string;
  surname: string;
  birth: undefined;
  gender: UserGender;
  weight: number;
  height: number;
  profilePicture?: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  resetPasswordToken: string;
  password: string;
  confirmPassword: string;
}

export interface CreateGoalInput {
  uuid?: string;
  trainings: number;
  kcal: number;
  points: number;
}

export interface TrainingCreateInput {
  uuid?: string;
  title: string;
  time: number;
  points: number;
  kcal: number;
  pictureUrl?: string;
  exercises: ExerciseCreateMultipleInput;
}

export interface ExerciseCreateMultipleInput {
  connect: ExerciseWhereUniqueInput[];
}

export interface ExerciseWhereUniqueInput {
  uuid: string;
}

export interface TrainingWhereUniqueInput {
  uuid: string;
}

export interface Schema {
  query?: Query;
  mutation?: Mutation;
}

export interface LoginFacebookInput {
  accessToken: string;
}

export interface TrainingUpdateInput {
  title?: string;
  time?: number;
  points?: number;
  kcal?: number;
  pictureUrl?: string;
  exercises?: ExerciseUpdateMultipleInput;
}

export interface ExerciseUpdateMultipleInput {
  connect: ExerciseWhereUniqueInput[];
}

export type UserGender = 'M' | 'F';

export type ExerciseLocale = 'EN' | 'FR';

export type OrderDirection = 'ASC' | 'DESC';

export type UserRole = 'USER' | 'ADMIN';

export interface meArgs {}

export interface emailExistsArgs {
  data: EmailExistsInput;
}

export interface getCurrentGoalArgs {}

export interface getLastTrainingsArgs {
  take?: number;
}

export interface getTrainingsArgs {
  take?: number;
  skip?: number;
}

export interface getMonthlyCalendarActivitiesArgs {
  date: undefined;
}

export interface loginArgs {
  data: LoginInput;
}

export interface loginWithFacebookArgs {
  accessToken: string;
}

export interface registerArgs {
  data: RegisterInput;
}

export interface registerWithFacebookArgs {
  accessToken: string;
  data: RegisterFacebookInput;
}

export interface forgotPasswordArgs {
  redirectUrl: string;
  data: ForgotPasswordInput;
}

export interface resetPasswordArgs {
  data: ResetPasswordInput;
}

export interface createGoalArgs {
  data: CreateGoalInput;
}

export interface createTrainingArgs {
  data: TrainingCreateInput;
}

export interface completeTrainingArgs {
  where: TrainingWhereUniqueInput;
}

export interface setTrainingReactionArgs {
  where: TrainingWhereUniqueInput;
}

import { DocumentNode } from 'graphql';
import graphQlTag from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

const guessFragmentType = (fragment: string | DocumentNode) => {
  let isString,
    isFragment = false;
  let fragmentName = '';
  if (typeof fragment === 'string') {
    isString = true;
  } else if (typeof fragment === 'object' && fragment.definitions.length) {
    isFragment = true;
    const definition = fragment.definitions[0];
    if (definition.kind === 'FragmentDefinition') {
      fragmentName = definition.name.value;
    } else {
      console.error(
        `The argument passed is not a fragment definition, got ${definition.kind} instead`
      );
      return;
    }
  }
  return { isString, isFragment, fragmentName };
};

export const ApiHooks = {
  useMe(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query me  {
        me {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<{ me: User }>(query);
  },
  useEmailExists() {
    const query = graphQlTag`
      query emailExists ($data: EmailExistsInput!) {
        emailExists(data: $data)
      }`;
    return useQuery<{ emailExists: boolean }>(query);
  },
  useGetCurrentGoal(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getCurrentGoal  {
        getCurrentGoal {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<{ getCurrentGoal: Goal }>(query);
  },
  useGetLastTrainings(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getLastTrainings ($take: Int) {
        getLastTrainings(take: $take) {
          
    pageInfo {
        
    hasNextPage }
    edges {
        
    node{${isString ? fragment : '...' + fragmentName}} }
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<{ getLastTrainings: TrainingConnection }, getLastTrainingsArgs>(query);
  },
  useGetTrainings(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getTrainings ($take: Int,$skip: Int) {
        getTrainings(take: $take,skip: $skip) {
          
    pageInfo {
        
    hasNextPage }
    edges {
        
    node{${isString ? fragment : '...' + fragmentName}} }
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<{ getTrainings: TrainingConnection }, getTrainingsArgs>(query);
  },
  useGetMonthlyCalendarActivities(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getMonthlyCalendarActivities ($date: Date!) {
        getMonthlyCalendarActivities(date: $date) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useQuery<
      { getMonthlyCalendarActivities: CalendarActivity[] },
      getMonthlyCalendarActivitiesArgs
    >(query);
  },
  useLogin(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation login ($data: LoginInput!) {
        login(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ login: LoginPayload }, loginArgs>(mutation);
  },
  useLoginWithFacebook(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation loginWithFacebook ($accessToken: String!) {
        loginWithFacebook(accessToken: $accessToken) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ loginWithFacebook: LoginPayload }, loginWithFacebookArgs>(mutation);
  },
  useRegister(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation register ($data: RegisterInput!) {
        register(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ register: LoginPayload }, registerArgs>(mutation);
  },
  useRegisterWithFacebook(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation registerWithFacebook ($accessToken: String!,$data: RegisterFacebookInput!) {
        registerWithFacebook(accessToken: $accessToken,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ registerWithFacebook: LoginPayload }, registerWithFacebookArgs>(mutation);
  },
  useForgotPassword() {
    const mutation = graphQlTag`
      mutation forgotPassword ($redirectUrl: String!,$data: ForgotPasswordInput!) {
        forgotPassword(redirectUrl: $redirectUrl,data: $data)
      }`;
    return useMutation<{ forgotPassword: boolean }>(mutation);
  },
  useResetPassword(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation resetPassword ($data: ResetPasswordInput!) {
        resetPassword(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ resetPassword: LoginPayload }, resetPasswordArgs>(mutation);
  },
  useCreateGoal(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation createGoal ($data: CreateGoalInput!) {
        createGoal(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ createGoal: Goal }, createGoalArgs>(mutation);
  },
  useCreateTraining(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation createTraining ($data: TrainingCreateInput!) {
        createTraining(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ createTraining: Training }, createTrainingArgs>(mutation);
  },
  useCompleteTraining(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation completeTraining ($where: TrainingWhereUniqueInput!) {
        completeTraining(where: $where) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ completeTraining: Training }, completeTrainingArgs>(mutation);
  },
  useSetTrainingReaction(fragment: string | DocumentNode) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation setTrainingReaction ($where: TrainingWhereUniqueInput!) {
        setTrainingReaction(where: $where) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

    return useMutation<{ setTrainingReaction: Training }, setTrainingReactionArgs>(mutation);
  }
};
