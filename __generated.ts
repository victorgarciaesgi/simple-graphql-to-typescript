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
  me?: User;
  user: User;
  usersConnection: UserConnection;
  requestResetUserPassword?: boolean;
  nurseriesConnection: NurseryConnectionWithRevenues;
  nursery: Nursery;
  nurseryPlanning: NurseryPlanning;
  nurseryKeyFigures: NurseryKeyFigures;
  bansConnection?: BanConnection;
  document: Document;
  getDocumentUrl: string;
  child: Child;
  customerMe: Customer;
  customer: CustomerWithRegistration;
  customersConnection?: CustomersConnection;
  reservationsConnection: ReservationConnection;
  reservation: Reservation;
  dashboard: Dashboard;
  nurseryConfig: NurseryConfig;
  registrationsConnection: RegistrationsConnection;
  registration: Registration;
  mailsConnection: MailConnection;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  slug: string;
  role: Role;
  nurseries: Nursery[];
  active?: boolean;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Nursery {
  id: string;
  analyticCode: string;
  name: string;
  slug: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  description?: string;
  totalCapacity: number;
  type: NurseryType;
  tags?: NurseryTag[];
  sections?: Section[];
  price?: number;
  schedule: Schedule;
  visit: Visit;
  pictures: Picture[];
  responsibleName?: string;
  responsibleEmail?: string;
  mikadoId: string;
  registrations?: Registration[];
  closingDates?: ClosingDate[];
  reservations?: Reservation[];
  active: boolean;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Section {
  id: string;
  code: string;
  name: string;
  ageMin: number;
  ageMax: number;
  capacity: number;
  availabilities: Availability[];
  nursery: Nursery;
  polluxSectionId: number;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Availability {
  id: string;
  compoundKey: string;
  section: Section;
  remainingPlaces: number;
  date: undefined;
  type: ReservationType;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Schedule {
  id: string;
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
}

export interface Visit {
  id: string;
  weekDay: number;
  start: string;
  end: string;
}

export interface Picture {
  id: string;
  url: string;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Registration {
  id: string;
  child: Child;
  nursery: Nursery;
  status: RegistrationStatus;
  registrationDate: undefined;
  reservation?: Reservation;
  welcoming?: Welcoming;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  picture?: Picture;
  documents: Document[];
  allergies: Allergy[];
  notes: string[];
  reservations?: Reservation[];
  parent: Customer;
  registrations?: Registration[];
  birthDate: undefined;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Document {
  id: string;
  uuid: string;
  type: DocumentType;
  status: DocumentStatus;
  format: DocumentFormat;
  extension: string;
  expirationDate?: undefined;
  reason?: DocumentRejectedReason;
  comment?: string;
  child?: Child;
  parent?: Customer;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Customer {
  id: string;
  slug: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  password: string;
  children: Child[];
  reservations: Reservation[];
  documents: Document[];
  picture?: Picture;
  bans: Ban[];
  price?: number;
  isBanned: boolean;
  banReason?: BanReason;
  banComment?: string;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Reservation {
  id: string;
  status: ReservationStatus;
  statusReason?: RejectReason;
  reasonComment?: string;
  child: Child;
  nursery: Nursery;
  section?: Section;
  customer?: Customer;
  price?: number;
  type: ReservationType;
  date: undefined;
  validationDate?: undefined;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Ban {
  id: string;
  nursery: Nursery;
  customer: Customer;
  reason: BanReason;
  description?: string;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Welcoming {
  id: string;
  date: undefined;
  nursery: Nursery;
  child: Child;
  status: WelcomingStatus;
  registration: Registration;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface ClosingDate {
  id: string;
  closingDateStart: undefined;
  closingDateEnd: undefined;
  polluxClosingDateId: number;
  nursery?: Nursery;
}

export interface UserWhereUniqueInput {
  id: string;
}

export interface UserConnectionWhereInput {
  role: Role;
  searchQuery?: string;
}

export interface UserConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: UserEdge[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
  totalPage?: number;
}

export interface Aggregate {
  count: number;
}

export interface UserEdge {
  node: User;
}

export interface NurseryConnectionWhereInput {
  search?: string;
  active?: boolean;
  orderBy?: NurseryConnectionFilterEnum;
}

export interface NurseryConnectionWithRevenues {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: NurseryEdgeWithRevenues[];
}

export interface NurseryEdgeWithRevenues {
  node: NurseryWithRevenues;
}

export interface NurseryWithRevenues {
  id: string;
  name: string;
  pendingReservation: number;
  pendingRegistration: number;
  processed: number;
  revenues: number;
  active: boolean;
}

export interface NurseryPlanning {
  reservations: Reservation[];
  availabilities: Availability[];
  registrations: Registration[];
  welcomings?: WelcomingExtended[];
}

export interface WelcomingExtended {
  id: string;
  date: undefined;
  child: ChildLight;
  status: WelcomingStatus;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface ChildLight {
  firstName: string;
  lastName: string;
  parent: ParentLight;
}

export interface ParentLight {
  firstName: string;
  lastName: string;
}

export interface NurseryKeyFigures {
  availabilities?: number;
  revenues?: number;
  signUps?: number;
}

export interface BansConnectionInput {
  search?: string;
  nursery?: string;
}

export interface BanConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: BanEdge[];
}

export interface BanEdge {
  node: Ban;
}

export interface WhereUniqueInput {
  id: string;
}

export interface CustomerWithRegistration {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  password: string;
  children: Child[];
  registrations?: Registration[];
  nurseryNumber: number;
  documents: Document[];
  picture?: Picture;
  bans: Ban[];
  price?: number;
  isBanned?: boolean;
  banReason?: BanReason;
  banComment?: string;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface CustomersConnectionWhereInput {
  search?: string;
}

export interface CustomersConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: CustomerEdge[];
}

export interface CustomerEdge {
  node: CustomerExtended;
}

export interface CustomerExtended {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  password: string;
  children: Child[];
  reservations?: Reservation[];
  nurseryNumber: number;
  documents: Document[];
  picture?: Picture;
  bans: Ban[];
  price?: number;
  isBanned?: boolean;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface ReservationConnectionWhereInput {
  nursery?: NurseryWhereUniqueInput;
  customer?: CustomerWhereUniqueInput;
  startDate?: undefined;
  endDate?: undefined;
  status?: ReservationStatus;
  noRegistration?: boolean;
}

export interface NurseryWhereUniqueInput {
  id: string;
}

export interface CustomerWhereUniqueInput {
  id?: string;
  email?: string;
}

export interface ReservationConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: ReservationEdge[];
}

export interface ReservationEdge {
  node: Reservation;
}

export interface Dashboard {
  processedRegistrations?: number;
  processedReservations?: number;
  pendingRegistrations?: number;
  pendingReservations?: number;
  nurseryNumber?: number;
  recentNurseries?: number;
  availabilities?: number;
  revenues?: number;
  validatedRegistrations?: number;
}

export interface NurseryConfig {
  id: string;
  price: number;
}

export interface RegistrationWhereInput {
  nursery: NurseryWhereUniqueInput;
  status?: RegistrationStatus;
}

export interface RegistrationsConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: RegistrationEdge[];
}

export interface RegistrationEdge {
  node: Registration;
}

export interface RegistrationWhereUniqueInput {
  id: string;
}

export interface MailWhereInput {
  search?: string;
  type?: MailType;
}

export interface MailConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: MailEdge[];
}

export interface MailEdge {
  node: Mail;
}

export interface Mail {
  id: string;
  slug: string;
  name: string;
  object: string;
  content: string;
  type: MailType;
  variables: Variable[];
  createdAt: undefined;
  updatedAt: undefined;
}

export interface Variable {
  id: string;
  name: string;
  value: string;
}

export interface Mutation {
  uploadPicture: Picture;
  deletePicture: boolean;
  login?: AuthPayload;
  resetUserPassword?: boolean;
  updateUser?: User;
  activateUser?: AuthPayload;
  deleteUser?: boolean;
  createUser?: User;
  _empty?: string;
  updateNursery?: Nursery;
  createBan: Ban;
  deleteBan: boolean;
  createDocument: Document;
  updateDocument: Document;
  uploadDocument: Document;
  createChild: Child;
  updateChild: Child;
  deleteChild: Child;
  customerLogin?: CustomerLoginResponse;
  updateCustomer?: Customer;
  banCustomer: Customer;
  createReservation?: Reservation;
  updateReservation?: Reservation;
  updateNurseryConfig: NurseryConfig;
  updateRegistration: Registration;
  updateMail: Mail;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface ResetUserPasswordInput {
  userId: string;
  password?: string;
  token?: string;
}

export interface UpdateUserInput {
  id?: string;
  password?: string;
  nurseries?: string[];
}

export interface ActivateUserInput {
  userId: string;
  password?: string;
  token?: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  nurseries?: string[];
}

export interface UpdateNurseryInput {
  picture?: File;
  schedule?: ScheduleInput;
  visit?: VisitInput;
  tags?: NurseryTag[];
  description?: string;
}

export interface ScheduleInput {
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
}

export interface VisitInput {
  weekDay: number;
  start: string;
  end: string;
}

export interface CreateBanWhereInput {
  customer: string;
  nursery: string;
}

export interface CreateBanInput {
  reason: BanReason;
  description?: string;
}

export interface BanWhereUniqueInput {
  id: string;
}

export interface DocumentStatusUpdateDataInput {
  status?: DocumentStatus;
  reason?: DocumentRejectedReason;
  comment?: string;
  reservation?: ReservationWhereUniqueInput;
  registration?: RegistrationWhereUniqueInput;
}

export interface ReservationWhereUniqueInput {
  id: string;
}

export interface DocumentCreateInput {
  file: File;
  type: DocumentType;
}

export interface CreateChildInput {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: undefined;
  allergies?: ChildAllergiesInput;
  notes?: ChildNotesInput;
  picture?: PictureConnect;
  documents?: DocumentCreateManyInput;
  parent: CustomerConnect;
}

export interface ChildAllergiesInput {
  set?: Allergy[];
}

export interface ChildNotesInput {
  set?: string[];
}

export interface PictureConnect {
  create: PictureCreateInput;
}

export interface PictureCreateInput {
  id?: string;
  url: string;
}

export interface DocumentCreateManyInput {
  create?: DocumentCreateInput[];
}

export interface CustomerConnect {
  connect: CustomerWhereUniqueInput;
}

export interface UpdateChildInput {
  firstName?: string;
  lastName?: string;
  birthDate?: undefined;
  allergies?: ChildAllergiesInput;
  notes?: ChildNotesInput;
  picture?: PictureUpdateOneInput;
  documents?: DocumentUpdateInput;
}

export interface PictureUpdateOneInput {
  update?: PictureUpdateDataInput;
}

export interface PictureUpdateDataInput {
  url?: string;
}

export interface DocumentUpdateInput {
  update?: DocumentUpdateWithWhereUniqueNestedInput[];
}

export interface DocumentUpdateWithWhereUniqueNestedInput {
  where: WhereUniqueInput;
  data: DocumentUpdateDataInput;
}

export interface DocumentUpdateDataInput {
  url?: string;
  type?: DocumentType;
  format?: DocumentFormat;
  expirationDate?: undefined;
  status?: DocumentStatusUpdateOneRequiredInput;
}

export interface DocumentStatusUpdateOneRequiredInput {
  update?: DocumentStatusUpdateDataInput;
}

export interface CustomerLoginInput {
  email: string;
  password: string;
}

export interface CustomerLoginResponse {
  customer: Customer;
  token: string;
}

export interface CustomerUpdateInput {
  price?: number;
  isBanned?: boolean;
}

export interface ReservationCreateInput {
  childId: string;
  nurseryId: string;
  sectionId: string;
  type: ReservationType;
  date: undefined;
}

export interface ReservationUpdateInput {
  status?: ReservationStatus;
  statusReason?: RejectReason;
  reasonComment?: string;
  price?: number;
}

export interface NurseryConfigInput {
  price: number;
}

export interface RegistrationUpdateInput {
  status: RegistrationStatus;
}

export interface MailWhereUniqueInput {
  id: string;
}

export interface MailUpdateInput {
  name?: string;
  object?: string;
  content?: string;
  type?: MailType;
}

export interface DocumentStatusCreateOneInput {
  create?: DocumentStatusCreateInput;
  connect?: WhereUniqueInput;
}

export interface DocumentStatusCreateInput {
  id?: string;
  status: DocumentStatus;
  reason?: DocumentRejectedReason;
  comment?: string;
}

export interface NurseryReservationConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: ReservationEdge[];
}

export interface SignupConnectionWhereInput {
  nursery?: string;
  status?: RegistrationStatus;
  start?: undefined;
  end?: undefined;
}

export interface ReservationExtended {
  id: string;
  status: ReservationStatus;
  statusReason?: RejectReason;
  requestType: RequestType;
  child: Child;
  nursery: Nursery;
  section?: Section;
  price?: number;
  type: ReservationType;
  date: undefined;
  createdAt: undefined;
  updatedAt: undefined;
}

export interface SignUpInput {
  firstName: string;
  email: string;
  password: string;
}

export interface CustomerAuthPayload {
  token: string;
  customer: Customer;
}

export interface DocumentConnectionWhereInput {
  name_contains?: string;
  type?: DocumentType;
}

export type Role = 'ADMIN' | 'DIRECTOR';

export type NurseryType = 'PAJE' | 'PSU';

export type NurseryTag = 'BIO_ALIMENTATION' | 'INTERNATIONNAL' | 'OUTDOOR';

export type ReservationType = 'MORNING' | 'AFTERNOON';

export type DocumentType =
  | 'CHILD_HEALTH_RECORD'
  | 'MEDICAL_CERTIFICATE'
  | 'BIRTH_CERTIFICATE'
  | 'PARENT_ID'
  | 'INSURANCE_CARD_CERTIFICATE'
  | 'CAF_IMMATRICULATION'
  | 'INSURANCE_CERTIFICATE'
  | 'RIB';

export type DocumentStatus = 'OK' | 'DECLINED' | 'PENDING' | 'EXPIRED';

export type DocumentFormat = 'PDF' | 'IMAGE';

export type DocumentRejectedReason =
  | 'UNREADABLE'
  | 'DOCUMENT_ERROR'
  | 'INCOMPLETE'
  | 'OUTDATED'
  | 'MISSING';

export type ReservationStatus = 'DONE' | 'REFUSED' | 'PENDING' | 'CANCELED' | 'EXPIRED';

export type RejectReason = 'NO_STAFF' | 'NURSERY_CLOSED' | 'NO_SPACE' | 'BANNED_USER';

export type BanReason = 'UNPAID' | 'CHILDREN_BEHAVIOR' | 'PARENT_BEHAVIOR' | 'RULES_FAILURE';

export type Allergy = 'GLUTEN' | 'MILK_AND_EGGS' | 'FISH' | 'SULFUR_DIOXIDE' | 'EGGS';

export type RegistrationStatus = 'PENDING' | 'REFUSED' | 'DONE';

export type WelcomingStatus = 'PENDING' | 'DONE';

export type NurseryConnectionFilterEnum =
  | 'REGISTRATION_PENDING'
  | 'RESERVATION_PENDING'
  | 'REQUEST_HANDLED'
  | 'REVENUES'
  | 'NAME';

export type MailType = 'REGISTRATION' | 'RESERVATION';

export type RequestType = 'REGISTRATION' | 'RESERVATION';

export interface meArgs {}

export interface userArgs {
  where: UserWhereUniqueInput;
}

export interface usersConnectionArgs {
  where?: UserConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface requestResetUserPasswordArgs {
  userId?: string;
}

export interface nurseriesConnectionArgs {
  where?: NurseryConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface nurseryArgs {
  id?: string;
}

export interface nurseryPlanningArgs {
  id: string;
  start: undefined;
  end: undefined;
}

export interface nurseryKeyFiguresArgs {
  id: string;
  start: undefined;
  end: undefined;
}

export interface bansConnectionArgs {
  where?: BansConnectionInput;
  page?: number;
  limit?: number;
}

export interface documentArgs {
  id?: string;
}

export interface getDocumentUrlArgs {
  where: WhereUniqueInput;
}

export interface childArgs {
  where: string;
}

export interface customerMeArgs {}

export interface customerArgs {
  customerId: string;
}

export interface customersConnectionArgs {
  where?: CustomersConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface reservationsConnectionArgs {
  where?: ReservationConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface reservationArgs {
  id: string;
}

export interface dashboardArgs {
  start?: undefined;
  end?: undefined;
}

export interface nurseryConfigArgs {}

export interface registrationsConnectionArgs {
  where: RegistrationWhereInput;
  page?: number;
  limit?: number;
}

export interface registrationArgs {
  where: RegistrationWhereUniqueInput;
}

export interface mailsConnectionArgs {
  where?: MailWhereInput;
  page?: number;
  limit?: number;
}

export interface uploadPictureArgs {
  picture: File;
}

export interface deletePictureArgs {
  id: string;
}

export interface loginArgs {
  data?: LoginInput;
}

export interface resetUserPasswordArgs {
  data?: ResetUserPasswordInput;
}

export interface updateUserArgs {
  user?: UpdateUserInput;
}

export interface activateUserArgs {
  data?: ActivateUserInput;
}

export interface deleteUserArgs {
  userId: string;
}

export interface createUserArgs {
  user: CreateUserInput;
}

export interface updateNurseryArgs {
  id: string;
  data: UpdateNurseryInput;
}

export interface createBanArgs {
  where: CreateBanWhereInput;
  data: CreateBanInput;
}

export interface deleteBanArgs {
  where: BanWhereUniqueInput;
}

export interface createDocumentArgs {}

export interface updateDocumentArgs {
  where: WhereUniqueInput;
  data: DocumentStatusUpdateDataInput;
}

export interface uploadDocumentArgs {
  data: DocumentCreateInput;
}

export interface createChildArgs {
  where: string;
  data: CreateChildInput;
}

export interface updateChildArgs {
  where: string;
  data: UpdateChildInput;
}

export interface deleteChildArgs {
  where: string;
}

export interface customerLoginArgs {
  data?: CustomerLoginInput;
}

export interface updateCustomerArgs {
  where: CustomerWhereUniqueInput;
  data: CustomerUpdateInput;
}

export interface banCustomerArgs {
  where: CustomerWhereUniqueInput;
  data: CreateBanInput;
}

export interface createReservationArgs {
  data?: ReservationCreateInput;
}

export interface updateReservationArgs {
  where: ReservationWhereUniqueInput;
  data: ReservationUpdateInput;
}

export interface updateNurseryConfigArgs {
  data: NurseryConfigInput;
}

export interface updateRegistrationArgs {
  where: RegistrationWhereUniqueInput;
  data: RegistrationUpdateInput;
}

export interface updateMailArgs {
  where: MailWhereUniqueInput;
  data?: MailUpdateInput;
}

import ApolloClient, { QueryOptions, OperationVariables, MutationOptions } from 'apollo-client';
import { OperationDefinitionNode, DocumentNode } from 'graphql';
import graphQlTag from 'graphql-tag';

interface AbordableRequest<T> {
  abort: () => void;
  get: () => Promise<T>;
}
export interface Fragmentable<T> {
  $fragment(fragment: string | DocumentNode): Promise<AbordableRequest<T>>;
}

export const apiProvider = (apolloClient: ApolloClient<any>) => {
  const abortableQuery = <T>(query: QueryOptions<OperationVariables>): AbordableRequest<T> => {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
      abort: () => controller.abort(),
      get: async () => {
        try {
          const { data, errors } = await apolloClient.query({
            ...query,
            context: {
              fetchOptions: {
                signal,
              },
            },
          });
          const parsedQuery = query.query.definitions[0] as OperationDefinitionNode;
          const queryName = parsedQuery.name.value;
          if (data) {
            return Promise.resolve(data[queryName]);
          } else {
            return Promise.reject(errors);
          }
        } catch (e) {
          return Promise.reject(e);
        }
      },
    };
  };
  const abortableMutation = <T>(
    mutation: MutationOptions<OperationVariables>
  ): AbordableRequest<T> => {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
      abort: () => controller.abort(),
      get: async () => {
        try {
          const { data, errors } = await apolloClient.mutate({
            ...mutation,
            context: {
              fetchOptions: {
                signal,
              },
            },
          });
          const parsedQuery = mutation.mutation.definitions[0] as OperationDefinitionNode;
          const mutationName = parsedQuery.name.value;
          if (data) {
            return Promise.resolve(data[mutationName]);
          } else {
            return Promise.reject(errors);
          }
        } catch (e) {
          return Promise.reject(e);
        }
      },
    };
  };

  return {
    me: (): Fragmentable<User> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<User>({
            query: graphQlTag`
            query me  {
              me {
                ${fragment}
              }
          }`,
            variables: {},
          });
        },
      };
    },
    user: (args: { where: UserWhereUniqueInput }): Fragmentable<User> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<User>({
            query: graphQlTag`
            query user ($where: UserWhereUniqueInput!) {
              user(where: $where) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
            },
          });
        },
      };
    },
    usersConnection: (args: {
      where: UserConnectionWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<UserConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<UserConnection>({
            query: graphQlTag`
            query usersConnection ($where: UserConnectionWhereInput,$page: Int,$limit: Int) {
              usersConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    requestResetUserPassword: async (args: {
      userId: string;
    }): Promise<AbordableRequest<boolean>> => {
      return abortableQuery<boolean>({
        query: graphQlTag`
        query requestResetUserPassword ($userId: ID) {
          requestResetUserPassword(userId: $userId)
        }`,
        variables: {
          userId: args.userId,
        },
      });
    },
    nurseriesConnection: (args: {
      where: NurseryConnectionWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<NurseryConnectionWithRevenues> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<NurseryConnectionWithRevenues>({
            query: graphQlTag`
            query nurseriesConnection ($where: NurseryConnectionWhereInput,$page: Int,$limit: Int) {
              nurseriesConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    nursery: (args: { id: string }): Fragmentable<Nursery> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Nursery>({
            query: graphQlTag`
            query nursery ($id: ID) {
              nursery(id: $id) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
            },
          });
        },
      };
    },
    nurseryPlanning: (args: {
      id: string;
      start: undefined;
      end: undefined;
    }): Fragmentable<NurseryPlanning> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<NurseryPlanning>({
            query: graphQlTag`
            query nurseryPlanning ($id: ID!,$start: DateTime!,$end: DateTime!) {
              nurseryPlanning(id: $id,start: $start,end: $end) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
              start: args.start,
              end: args.end,
            },
          });
        },
      };
    },
    nurseryKeyFigures: (args: {
      id: string;
      start: undefined;
      end: undefined;
    }): Fragmentable<NurseryKeyFigures> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<NurseryKeyFigures>({
            query: graphQlTag`
            query nurseryKeyFigures ($id: ID!,$start: DateTime!,$end: DateTime!) {
              nurseryKeyFigures(id: $id,start: $start,end: $end) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
              start: args.start,
              end: args.end,
            },
          });
        },
      };
    },
    bansConnection: (args: {
      where: BansConnectionInput;
      page: number;
      limit: number;
    }): Fragmentable<BanConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<BanConnection>({
            query: graphQlTag`
            query bansConnection ($where: BansConnectionInput,$page: Int,$limit: Int) {
              bansConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    document: (args: { id: string }): Fragmentable<Document> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Document>({
            query: graphQlTag`
            query document ($id: ID) {
              document(id: $id) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
            },
          });
        },
      };
    },
    getDocumentUrl: async (args: {
      where: WhereUniqueInput;
    }): Promise<AbordableRequest<string>> => {
      return abortableQuery<string>({
        query: graphQlTag`
        query getDocumentUrl ($where: WhereUniqueInput!) {
          getDocumentUrl(where: $where)
        }`,
        variables: {
          where: args.where,
        },
      });
    },
    child: (args: { where: string }): Fragmentable<Child> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Child>({
            query: graphQlTag`
            query child ($where: ID!) {
              child(where: $where) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
            },
          });
        },
      };
    },
    customerMe: (): Fragmentable<Customer> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Customer>({
            query: graphQlTag`
            query customerMe  {
              customerMe {
                ${fragment}
              }
          }`,
            variables: {},
          });
        },
      };
    },
    customer: (args: { customerId: string }): Fragmentable<CustomerWithRegistration> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<CustomerWithRegistration>({
            query: graphQlTag`
            query customer ($customerId: ID!) {
              customer(customerId: $customerId) {
                ${fragment}
              }
          }`,
            variables: {
              customerId: args.customerId,
            },
          });
        },
      };
    },
    customersConnection: (args: {
      where: CustomersConnectionWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<CustomersConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<CustomersConnection>({
            query: graphQlTag`
            query customersConnection ($where: CustomersConnectionWhereInput,$page: Int,$limit: Int) {
              customersConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    reservationsConnection: (args: {
      where: ReservationConnectionWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<ReservationConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<ReservationConnection>({
            query: graphQlTag`
            query reservationsConnection ($where: ReservationConnectionWhereInput,$page: Int,$limit: Int) {
              reservationsConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    reservation: (args: { id: string }): Fragmentable<Reservation> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Reservation>({
            query: graphQlTag`
            query reservation ($id: ID!) {
              reservation(id: $id) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
            },
          });
        },
      };
    },
    dashboard: (args: { start: undefined; end: undefined }): Fragmentable<Dashboard> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Dashboard>({
            query: graphQlTag`
            query dashboard ($start: DateTime,$end: DateTime) {
              dashboard(start: $start,end: $end) {
                ${fragment}
              }
          }`,
            variables: {
              start: args.start,
              end: args.end,
            },
          });
        },
      };
    },
    nurseryConfig: (): Fragmentable<NurseryConfig> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<NurseryConfig>({
            query: graphQlTag`
            query nurseryConfig  {
              nurseryConfig {
                ${fragment}
              }
          }`,
            variables: {},
          });
        },
      };
    },
    registrationsConnection: (args: {
      where: RegistrationWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<RegistrationsConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<RegistrationsConnection>({
            query: graphQlTag`
            query registrationsConnection ($where: RegistrationWhereInput!,$page: Int,$limit: Int) {
              registrationsConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    registration: (args: { where: RegistrationWhereUniqueInput }): Fragmentable<Registration> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<Registration>({
            query: graphQlTag`
            query registration ($where: RegistrationWhereUniqueInput!) {
              registration(where: $where) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
            },
          });
        },
      };
    },
    mailsConnection: (args: {
      where: MailWhereInput;
      page: number;
      limit: number;
    }): Fragmentable<MailConnection> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableQuery<MailConnection>({
            query: graphQlTag`
            query mailsConnection ($where: MailWhereInput,$page: Int,$limit: Int) {
              mailsConnection(where: $where,page: $page,limit: $limit) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              page: args.page,
              limit: args.limit,
            },
          });
        },
      };
    },
    uploadPicture: (args: { picture: File }): Fragmentable<Picture> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Picture>({
            mutation: graphQlTag`
            mutation uploadPicture ($picture: Upload!) {
              uploadPicture(picture: $picture) {
                ${fragment}
              }
          }`,
            variables: {
              picture: args.picture,
            },
          });
        },
      };
    },
    deletePicture: async (args: { id: string }): Promise<AbordableRequest<boolean>> => {
      return abortableMutation<boolean>({
        mutation: graphQlTag`
        mutation deletePicture ($id: ID!) {
          deletePicture(id: $id)
        }`,
        variables: {
          id: args.id,
        },
      });
    },
    login: (args: { data: LoginInput }): Fragmentable<AuthPayload> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<AuthPayload>({
            mutation: graphQlTag`
            mutation login ($data: LoginInput) {
              login(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    resetUserPassword: async (args: {
      data: ResetUserPasswordInput;
    }): Promise<AbordableRequest<boolean>> => {
      return abortableMutation<boolean>({
        mutation: graphQlTag`
        mutation resetUserPassword ($data: ResetUserPasswordInput) {
          resetUserPassword(data: $data)
        }`,
        variables: {
          data: args.data,
        },
      });
    },
    updateUser: (args: { user: UpdateUserInput }): Fragmentable<User> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<User>({
            mutation: graphQlTag`
            mutation updateUser ($user: UpdateUserInput) {
              updateUser(user: $user) {
                ${fragment}
              }
          }`,
            variables: {
              user: args.user,
            },
          });
        },
      };
    },
    activateUser: (args: { data: ActivateUserInput }): Fragmentable<AuthPayload> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<AuthPayload>({
            mutation: graphQlTag`
            mutation activateUser ($data: ActivateUserInput) {
              activateUser(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    deleteUser: async (args: { userId: string }): Promise<AbordableRequest<boolean>> => {
      return abortableMutation<boolean>({
        mutation: graphQlTag`
        mutation deleteUser ($userId: ID!) {
          deleteUser(userId: $userId)
        }`,
        variables: {
          userId: args.userId,
        },
      });
    },
    createUser: (args: { user: CreateUserInput }): Fragmentable<User> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<User>({
            mutation: graphQlTag`
            mutation createUser ($user: CreateUserInput!) {
              createUser(user: $user) {
                ${fragment}
              }
          }`,
            variables: {
              user: args.user,
            },
          });
        },
      };
    },
    updateNursery: (args: { id: string; data: UpdateNurseryInput }): Fragmentable<Nursery> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Nursery>({
            mutation: graphQlTag`
            mutation updateNursery ($id: ID!,$data: UpdateNurseryInput!) {
              updateNursery(id: $id,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              id: args.id,
              data: args.data,
            },
          });
        },
      };
    },
    createBan: (args: { where: CreateBanWhereInput; data: CreateBanInput }): Fragmentable<Ban> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Ban>({
            mutation: graphQlTag`
            mutation createBan ($where: CreateBanWhereInput!,$data: CreateBanInput!) {
              createBan(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    deleteBan: async (args: { where: BanWhereUniqueInput }): Promise<AbordableRequest<boolean>> => {
      return abortableMutation<boolean>({
        mutation: graphQlTag`
        mutation deleteBan ($where: BanWhereUniqueInput!) {
          deleteBan(where: $where)
        }`,
        variables: {
          where: args.where,
        },
      });
    },
    createDocument: (): Fragmentable<Document> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Document>({
            mutation: graphQlTag`
            mutation createDocument  {
              createDocument {
                ${fragment}
              }
          }`,
            variables: {},
          });
        },
      };
    },
    updateDocument: (args: {
      where: WhereUniqueInput;
      data: DocumentStatusUpdateDataInput;
    }): Fragmentable<Document> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Document>({
            mutation: graphQlTag`
            mutation updateDocument ($where: WhereUniqueInput!,$data: DocumentStatusUpdateDataInput!) {
              updateDocument(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    uploadDocument: (args: { data: DocumentCreateInput }): Fragmentable<Document> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Document>({
            mutation: graphQlTag`
            mutation uploadDocument ($data: DocumentCreateInput!) {
              uploadDocument(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    createChild: (args: { where: string; data: CreateChildInput }): Fragmentable<Child> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Child>({
            mutation: graphQlTag`
            mutation createChild ($where: ID!,$data: CreateChildInput!) {
              createChild(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    updateChild: (args: { where: string; data: UpdateChildInput }): Fragmentable<Child> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Child>({
            mutation: graphQlTag`
            mutation updateChild ($where: ID!,$data: UpdateChildInput!) {
              updateChild(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    deleteChild: (args: { where: string }): Fragmentable<Child> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Child>({
            mutation: graphQlTag`
            mutation deleteChild ($where: ID!) {
              deleteChild(where: $where) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
            },
          });
        },
      };
    },
    customerLogin: (args: { data: CustomerLoginInput }): Fragmentable<CustomerLoginResponse> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<CustomerLoginResponse>({
            mutation: graphQlTag`
            mutation customerLogin ($data: CustomerLoginInput) {
              customerLogin(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    updateCustomer: (args: {
      where: CustomerWhereUniqueInput;
      data: CustomerUpdateInput;
    }): Fragmentable<Customer> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Customer>({
            mutation: graphQlTag`
            mutation updateCustomer ($where: CustomerWhereUniqueInput!,$data: CustomerUpdateInput!) {
              updateCustomer(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    banCustomer: (args: {
      where: CustomerWhereUniqueInput;
      data: CreateBanInput;
    }): Fragmentable<Customer> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Customer>({
            mutation: graphQlTag`
            mutation banCustomer ($where: CustomerWhereUniqueInput!,$data: CreateBanInput!) {
              banCustomer(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    createReservation: (args: { data: ReservationCreateInput }): Fragmentable<Reservation> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Reservation>({
            mutation: graphQlTag`
            mutation createReservation ($data: ReservationCreateInput) {
              createReservation(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    updateReservation: (args: {
      where: ReservationWhereUniqueInput;
      data: ReservationUpdateInput;
    }): Fragmentable<Reservation> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Reservation>({
            mutation: graphQlTag`
            mutation updateReservation ($where: ReservationWhereUniqueInput!,$data: ReservationUpdateInput!) {
              updateReservation(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    updateNurseryConfig: (args: { data: NurseryConfigInput }): Fragmentable<NurseryConfig> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<NurseryConfig>({
            mutation: graphQlTag`
            mutation updateNurseryConfig ($data: NurseryConfigInput!) {
              updateNurseryConfig(data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              data: args.data,
            },
          });
        },
      };
    },
    updateRegistration: (args: {
      where: RegistrationWhereUniqueInput;
      data: RegistrationUpdateInput;
    }): Fragmentable<Registration> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Registration>({
            mutation: graphQlTag`
            mutation updateRegistration ($where: RegistrationWhereUniqueInput!,$data: RegistrationUpdateInput!) {
              updateRegistration(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
    updateMail: (args: {
      where: MailWhereUniqueInput;
      data: MailUpdateInput;
    }): Fragmentable<Mail> => {
      return {
        $fragment: async (fragment: string | DocumentNode) => {
          return abortableMutation<Mail>({
            mutation: graphQlTag`
            mutation updateMail ($where: MailWhereUniqueInput!,$data: MailUpdateInput) {
              updateMail(where: $where,data: $data) {
                ${fragment}
              }
          }`,
            variables: {
              where: args.where,
              data: args.data,
            },
          });
        },
      };
    },
  };
};
