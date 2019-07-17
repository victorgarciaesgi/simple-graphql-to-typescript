/* eslint-disable */
/* tslint-disable */
// *******************************************************
// *******************************************************
//
// GENERATED FILE, DO NOT MODIFY
//
// Made by Victor Garcia ®
// https://github.com/victorgarciaesgi
// *******************************************************
// *******************************************************

import { apolloMutation, apolloQuery } from '@services';
import graphQlTag from 'graphql-tag';

const Fragments: { [T in keyof (Query & Mutation)]?: string } = {
  _empty: '',
  me: '',
  user: '',
  nurseriesConnection: '',
  nursery: '',
  nurseryPlanning: '',
  nurseryKeyFigures: '',
  document: '',
  child: '',
  customer: '',
  nurseryReservations: '',
  uploadPicture: '',
  deletePicture: '',
  login: '',
  updateUser: '',
  deleteUser: '',
  createUser: '',
  updateNursery: '',
  createDocument: '',
  updateDocument: '',
  createChild: '',
  updateChild: '',
  deleteChild: '',
  updateCustomer: '',
  signUp: '',
  createReservation: '',
  updateReservation: ''
};

export const declareFragments = (fragments: { [T in keyof (Query & Mutation)]?: string }) => {
  Object.keys(fragments).map(key => {
    Fragments[key] = fragments[key];
  });
};

export const _emptyQuery = async () => {
  return apolloQuery<string>({
    query: graphQlTag`
    query _empty  {
      _empty {
        ${Fragments._empty}
      }
    }
          `,
    variables: {}
  });
};

export const meQuery = async () => {
  return apolloQuery<User>({
    query: graphQlTag`
    query me  {
      me {
        ${Fragments.me}
      }
    }
          `,
    variables: {}
  });
};

export const userQuery = async () => {
  return apolloQuery<User>({
    query: graphQlTag`
    query user  {
      user {
        ${Fragments.user}
      }
    }
          `,
    variables: {}
  });
};

export const nurseriesConnectionQuery = async (
  where: NurseryConnectionWhereInput,
  page: number,
  limit: number
) => {
  return apolloQuery<NurseryConnectionWithRevenues>({
    query: graphQlTag`
    query nurseriesConnection ($where: NurseryConnectionWhereInput,$page: Int,$limit: Int) {
      nurseriesConnection(where: $where,page: $page,limit: $limit) {
        ${Fragments.nurseriesConnection}
      }
    }
          `,
    variables: {
      where,
      page,
      limit
    }
  });
};

export const nurseryQuery = async (id: string) => {
  return apolloQuery<Nursery>({
    query: graphQlTag`
    query nursery ($id: ID) {
      nursery(id: $id) {
        ${Fragments.nursery}
      }
    }
          `,
    variables: {
      id
    }
  });
};

export const nurseryPlanningQuery = async (id: string, start: Date, end: Date) => {
  return apolloQuery<NurseryPlanning>({
    query: graphQlTag`
    query nurseryPlanning ($id: ID!,$start: DateTime!,$end: DateTime!) {
      nurseryPlanning(id: $id,start: $start,end: $end) {
        ${Fragments.nurseryPlanning}
      }
    }
          `,
    variables: {
      id,
      start,
      end
    }
  });
};

export const nurseryKeyFiguresQuery = async (id: string, start: Date, end: Date) => {
  return apolloQuery<NurseryKeyFigures>({
    query: graphQlTag`
    query nurseryKeyFigures ($id: ID!,$start: DateTime!,$end: DateTime!) {
      nurseryKeyFigures(id: $id,start: $start,end: $end) {
        ${Fragments.nurseryKeyFigures}
      }
    }
          `,
    variables: {
      id,
      start,
      end
    }
  });
};

export const documentQuery = async (id: string) => {
  return apolloQuery<Document>({
    query: graphQlTag`
    query document ($id: ID) {
      document(id: $id) {
        ${Fragments.document}
      }
    }
          `,
    variables: {
      id
    }
  });
};

export const childQuery = async (where: string) => {
  return apolloQuery<Child>({
    query: graphQlTag`
    query child ($where: ID!) {
      child(where: $where) {
        ${Fragments.child}
      }
    }
          `,
    variables: {
      where
    }
  });
};

export const customerQuery = async () => {
  return apolloQuery<Customer>({
    query: graphQlTag`
    query customer  {
      customer {
        ${Fragments.customer}
      }
    }
          `,
    variables: {}
  });
};

export const nurseryReservationsQuery = async (
  nurseryId: string,
  startDate: Date,
  endDate: Date
) => {
  return apolloQuery<Reservation>({
    query: graphQlTag`
    query nurseryReservations ($nurseryId: ID!,$startDate: DateTime!,$endDate: DateTime!) {
      nurseryReservations(nurseryId: $nurseryId,startDate: $startDate,endDate: $endDate) {
        ${Fragments.nurseryReservations}
      }
    }
          `,
    variables: {
      nurseryId,
      startDate,
      endDate
    }
  });
};

export const uploadPictureMutation = async (picture: File) => {
  return apolloMutation<Picture>({
    mutation: graphQlTag`
    mutation uploadPicture ($picture: Upload!) {
      uploadPicture(picture: $picture) {
        ${Fragments.uploadPicture}
      }
    }
          `,
    variables: {
      picture
    }
  });
};

export const deletePictureMutation = async (id: string) => {
  return apolloMutation<boolean>({
    mutation: graphQlTag`
    mutation deletePicture ($id: ID!) {
      deletePicture(id: $id) {
        ${Fragments.deletePicture}
      }
    }
          `,
    variables: {
      id
    }
  });
};

export const loginMutation = async (data: LoginInput) => {
  return apolloMutation<AuthPayload>({
    mutation: graphQlTag`
    mutation login ($data: LoginInput) {
      login(data: $data) {
        ${Fragments.login}
      }
    }
          `,
    variables: {
      data
    }
  });
};

export const updateUserMutation = async () => {
  return apolloMutation<User>({
    mutation: graphQlTag`
    mutation updateUser  {
      updateUser {
        ${Fragments.updateUser}
      }
    }
          `,
    variables: {}
  });
};

export const deleteUserMutation = async () => {
  return apolloMutation<User>({
    mutation: graphQlTag`
    mutation deleteUser  {
      deleteUser {
        ${Fragments.deleteUser}
      }
    }
          `,
    variables: {}
  });
};

export const createUserMutation = async (user: CreateUserInput) => {
  return apolloMutation<User>({
    mutation: graphQlTag`
    mutation createUser ($user: CreateUserInput) {
      createUser(user: $user) {
        ${Fragments.createUser}
      }
    }
          `,
    variables: {
      user
    }
  });
};

export const _emptyMutation = async () => {
  return apolloMutation<string>({
    mutation: graphQlTag`
    mutation _empty  {
      _empty {
        ${Fragments._empty}
      }
    }
          `,
    variables: {}
  });
};

export const updateNurseryMutation = async (where: string, data: UpdateNurseryInput) => {
  return apolloMutation<Nursery>({
    mutation: graphQlTag`
    mutation updateNursery ($where: ID!,$data: UpdateNurseryInput!) {
      updateNursery(where: $where,data: $data) {
        ${Fragments.updateNursery}
      }
    }
          `,
    variables: {
      where,
      data
    }
  });
};

export const createDocumentMutation = async () => {
  return apolloMutation<Document>({
    mutation: graphQlTag`
    mutation createDocument  {
      createDocument {
        ${Fragments.createDocument}
      }
    }
          `,
    variables: {}
  });
};

export const updateDocumentMutation = async () => {
  return apolloMutation<Document>({
    mutation: graphQlTag`
    mutation updateDocument  {
      updateDocument {
        ${Fragments.updateDocument}
      }
    }
          `,
    variables: {}
  });
};

export const createChildMutation = async (where: string, data: CreateChildInput) => {
  return apolloMutation<Child>({
    mutation: graphQlTag`
    mutation createChild ($where: ID!,$data: CreateChildInput!) {
      createChild(where: $where,data: $data) {
        ${Fragments.createChild}
      }
    }
          `,
    variables: {
      where,
      data
    }
  });
};

export const updateChildMutation = async (where: string, data: UpdateChildInput) => {
  return apolloMutation<Child>({
    mutation: graphQlTag`
    mutation updateChild ($where: ID!,$data: UpdateChildInput!) {
      updateChild(where: $where,data: $data) {
        ${Fragments.updateChild}
      }
    }
          `,
    variables: {
      where,
      data
    }
  });
};

export const deleteChildMutation = async (where: string) => {
  return apolloMutation<Child>({
    mutation: graphQlTag`
    mutation deleteChild ($where: ID!) {
      deleteChild(where: $where) {
        ${Fragments.deleteChild}
      }
    }
          `,
    variables: {
      where
    }
  });
};

export const updateCustomerMutation = async () => {
  return apolloMutation<Customer>({
    mutation: graphQlTag`
    mutation updateCustomer  {
      updateCustomer {
        ${Fragments.updateCustomer}
      }
    }
          `,
    variables: {}
  });
};

export const signUpMutation = async (customer: SignUpInput) => {
  return apolloMutation<Customer>({
    mutation: graphQlTag`
    mutation signUp ($customer: SignUpInput) {
      signUp(customer: $customer) {
        ${Fragments.signUp}
      }
    }
          `,
    variables: {
      customer
    }
  });
};

export const createReservationMutation = async () => {
  return apolloMutation<Reservation>({
    mutation: graphQlTag`
    mutation createReservation  {
      createReservation {
        ${Fragments.createReservation}
      }
    }
          `,
    variables: {}
  });
};

export const updateReservationMutation = async () => {
  return apolloMutation<Reservation>({
    mutation: graphQlTag`
    mutation updateReservation  {
      updateReservation {
        ${Fragments.updateReservation}
      }
    }
          `,
    variables: {}
  });
};

export interface Query {
  _empty?: string;
  me?: User;
  user: User;
  nurseriesConnection: NurseryConnectionWithRevenues;
  nursery: Nursery;
  nurseryPlanning: NurseryPlanning;
  nurseryKeyFigures: NurseryKeyFigures;
  document: Document;
  child: Child;
  customer: Customer;
  nurseryReservations?: Reservation[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  role: Role;
  nurseries: Nursery[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Nursery {
  id: string;
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
  analyticCode: string;
  mikadoId: string;
  customers: NurseryCustomer[];
  closingDates?: ClosingDate[];
  reservations?: Reservation[];
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  id: string;
  section: Section;
  remainingPlaces: number;
  date: Date;
  type: ReservationType;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface NurseryCustomer {
  id: string;
  customer: Customer;
  nursery: Nursery;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
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
  documents: Document[];
  picture?: Picture;
  bans: Ban[];
  price?: number;
  createdAt: Date;
  updatedAt: Date;
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
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  url: string;
  type: DocumentType;
  status: DocumentStatus;
  format: DocumentFormat;
  expirationDate?: Date;
  reason?: DocumentRejectedReason;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  status: ReservationStatus;
  statusReason?: RejectReason;
  child: Child;
  nursery: Nursery;
  section?: Section;
  price?: number;
  type: ReservationType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ban {
  id: string;
  nursery: Nursery;
  fullBan?: boolean;
  reason: BanReason;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClosingDate {
  id: string;
  closingDateStart: Date;
  closingDateEnd: Date;
  polluxClosingDateId: number;
  nursery?: Nursery;
}

export interface NurseryConnectionWhereInput {
  search?: string;
  filter?: NurseryConnectionFilterEnum;
}

export interface NurseryConnectionWithRevenues {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: NurseryEdgeWithRevenues[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Aggregate {
  count: number;
}

export interface NurseryEdgeWithRevenues {
  node: NurseryWithRevenues;
}

export interface NurseryWithRevenues {
  id: string;
  name: string;
  pending: number;
  processed: number;
  revenues: number;
}

export interface NurseryPlanning {
  reservations: ReservationExtended[];
  availabilities: Availability[];
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
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NurseryKeyFigures {
  availabilities?: number;
  revenues?: number;
  signUps?: number;
}

export interface Mutation {
  uploadPicture: Picture;
  deletePicture: boolean;
  login?: AuthPayload;
  updateUser?: User;
  deleteUser?: User;
  createUser?: User;
  _empty?: string;
  updateNursery?: Nursery;
  createDocument?: Document;
  updateDocument?: Document;
  createChild: Child;
  updateChild: Child;
  deleteChild: Child;
  updateCustomer?: Customer;
  signUp?: Customer;
  createReservation?: Reservation;
  updateReservation?: Reservation;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface CreateUserInput {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateNurseryInput {
  picture?: File;
  description?: string;
}

export interface CreateChildInput {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
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

export interface DocumentCreateInput {
  id?: string;
  url: string;
  type: DocumentType;
  format: DocumentFormat;
  expirationDate?: Date;
  status: DocumentStatusCreateOneInput;
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

export interface WhereUniqueInput {
  id?: string;
}

export interface CustomerConnect {
  connect: CustomerWhereUniqueInput;
}

export interface CustomerWhereUniqueInput {
  id?: string;
  email?: string;
}

export interface UpdateChildInput {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
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
  expirationDate?: Date;
  status?: DocumentStatusUpdateOneRequiredInput;
}

export interface DocumentStatusUpdateOneRequiredInput {
  update?: DocumentStatusUpdateDataInput;
}

export interface DocumentStatusUpdateDataInput {
  status?: DocumentStatus;
  reason?: DocumentRejectedReason;
  comment?: string;
}

export interface SignUpInput {
  firstName: string;
  email: string;
  password: string;
}

export interface BanReasonType {
  id: string;
  name: string;
}

export interface ReservationEdge {
  node: Reservation;
}

export interface ReservationConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: ReservationEdge[];
}

export interface DocumentConnectionWhereInput {
  name_contains?: string;
  type?: DocumentType;
}

export type Role = 'ADMIN' | 'DIRECTOR';

export type NurseryType = 'PAJE' | 'PSU';

export type NurseryTag = 'BIO_ALIMENTATION' | 'NEW_FACILITY' | 'OUTDOOR';

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

export type Allergy = 'GLUTEN' | 'MILK_AND_EGGS' | 'FISH' | 'SULFUR_DIOXIDE' | 'EGGS';

export type ReservationStatus = 'OK' | 'REJECTED' | 'PENDING' | 'CANCELED' | 'EXPIRED';

export type RejectReason = 'NO_STAFF' | 'NURSERY_CLOSED' | 'NO_SPACE';

export type BanReason = 'UNPAID' | 'CHILDREN_BEHAVIOR' | 'PARENT_BEHAVIOR' | 'RULES_FAILURE';

export type NurseryConnectionFilterEnum = 'REQUEST_PENDING' | 'RESERVATION_PENDING';

export type RequestType = 'REGISTRATION' | 'RESERVATION';
