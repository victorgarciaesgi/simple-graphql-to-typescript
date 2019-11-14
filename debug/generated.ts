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
  birth: Date;
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
  date: Date;
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
  updateProfile: User;
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
  birth: Date;
  gender: UserGender;
  weight: number;
  height: number;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
  location: string;
}

export interface RegisterFacebookInput {
  name: string;
  surname: string;
  birth: Date;
  gender: UserGender;
  weight: number;
  height: number;
  profilePicture?: string;
  location: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  resetPasswordToken: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileInput {
  name?: string;
  surname?: string;
  birth?: Date;
  gender?: UserGender;
  weight?: number;
  height?: number;
  profilePicture?: string;
  location?: string;
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
  date: Date;
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

export interface updateProfileArgs {
  data: UpdateProfileInput;
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
import {
  useMutation,
  useQuery,
  QueryHookOptions,
  MutationHookOptions,
  MutationTuple
} from '@apollo/react-hooks';

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
  useMe(fragment: string | DocumentNode, options?: QueryHookOptions<User>) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query me  {
        me {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<User>(query, options);
    return {
      data: (data ? data[queryName] : null) as User,
      ...rest
    };
  },
  useEmailExists(options?: QueryHookOptions<boolean, emailExistsArgs>) {
    const query = graphQlTag`
      query emailExists ($data: EmailExistsInput!) {
        emailExists(data: $data)
      }`;
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<boolean, emailExistsArgs>(query, options);
    return {
      data: (data ? data[queryName] : null) as boolean,
      ...rest
    };
  },
  useGetCurrentGoal(fragment: string | DocumentNode, options?: QueryHookOptions<Goal>) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getCurrentGoal  {
        getCurrentGoal {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<Goal>(query, options);
    return {
      data: (data ? data[queryName] : null) as Goal,
      ...rest
    };
  },
  useGetLastTrainings(
    fragment: string | DocumentNode,
    options?: QueryHookOptions<TrainingConnection, getLastTrainingsArgs>
  ) {
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
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<TrainingConnection, getLastTrainingsArgs>(query, options);
    return {
      data: (data ? data[queryName] : null) as TrainingConnection,
      ...rest
    };
  },
  useGetTrainings(
    fragment: string | DocumentNode,
    options?: QueryHookOptions<TrainingConnection, getTrainingsArgs>
  ) {
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
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<TrainingConnection, getTrainingsArgs>(query, options);
    return {
      data: (data ? data[queryName] : null) as TrainingConnection,
      ...rest
    };
  },
  useGetMonthlyCalendarActivities(
    fragment: string | DocumentNode,
    options?: QueryHookOptions<CalendarActivity[], getMonthlyCalendarActivitiesArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const query = graphQlTag`
      query getMonthlyCalendarActivities ($date: Date!) {
        getMonthlyCalendarActivities(date: $date) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = query.definitions[0];
    const queryName = parsedQuery.name.value;

    const { data, ...rest } = useQuery<CalendarActivity[], getMonthlyCalendarActivitiesArgs>(
      query,
      options
    );
    return {
      data: (data ? data[queryName] : null) as CalendarActivity[],
      ...rest
    };
  },
  useLogin(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<LoginPayload, loginArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation login ($data: LoginInput!) {
        login(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<LoginPayload, loginArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<LoginPayload, loginArgs>;
  },
  useLoginWithFacebook(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<LoginPayload, loginWithFacebookArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation loginWithFacebook ($accessToken: String!) {
        loginWithFacebook(accessToken: $accessToken) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<LoginPayload, loginWithFacebookArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<
      LoginPayload,
      loginWithFacebookArgs
    >;
  },
  useRegister(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<LoginPayload, registerArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation register ($data: RegisterInput!) {
        register(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<LoginPayload, registerArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<LoginPayload, registerArgs>;
  },
  useRegisterWithFacebook(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<LoginPayload, registerWithFacebookArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation registerWithFacebook ($accessToken: String!,$data: RegisterFacebookInput!) {
        registerWithFacebook(accessToken: $accessToken,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<LoginPayload, registerWithFacebookArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<
      LoginPayload,
      registerWithFacebookArgs
    >;
  },
  useForgotPassword(options?: MutationHookOptions<boolean, forgotPasswordArgs>) {
    const mutation = graphQlTag`
      mutation forgotPassword ($redirectUrl: String!,$data: ForgotPasswordInput!) {
        forgotPassword(redirectUrl: $redirectUrl,data: $data)
      }`;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;
    const [mut, data] = useMutation<boolean, forgotPasswordArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<boolean, forgotPasswordArgs>;
  },
  useResetPassword(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<LoginPayload, resetPasswordArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation resetPassword ($data: ResetPasswordInput!) {
        resetPassword(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<LoginPayload, resetPasswordArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<LoginPayload, resetPasswordArgs>;
  },
  useUpdateProfile(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<User, updateProfileArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation updateProfile ($data: UpdateProfileInput!) {
        updateProfile(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<User, updateProfileArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<User, updateProfileArgs>;
  },
  useCreateGoal(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<Goal, createGoalArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation createGoal ($data: CreateGoalInput!) {
        createGoal(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<Goal, createGoalArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<Goal, createGoalArgs>;
  },
  useCreateTraining(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<Training, createTrainingArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation createTraining ($data: TrainingCreateInput!) {
        createTraining(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<Training, createTrainingArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<Training, createTrainingArgs>;
  },
  useCompleteTraining(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<Training, completeTrainingArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation completeTraining ($where: TrainingWhereUniqueInput!) {
        completeTraining(where: $where) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<Training, completeTrainingArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<Training, completeTrainingArgs>;
  },
  useSetTrainingReaction(
    fragment: string | DocumentNode,
    options?: MutationHookOptions<Training, setTrainingReactionArgs>
  ) {
    const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
    const mutation = graphQlTag`
      mutation setTrainingReaction ($where: TrainingWhereUniqueInput!) {
        setTrainingReaction(where: $where) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;
    const parsedQuery = mutation.definitions[0];
    const queryName = parsedQuery.name.value;

    const [mut, data] = useMutation<Training, setTrainingReactionArgs>(mutation, options);
    return [mut, data ? data[queryName] : null] as MutationTuple<Training, setTrainingReactionArgs>;
  }
};
