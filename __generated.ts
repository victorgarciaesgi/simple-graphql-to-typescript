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

export interface IQuery {
  _empty?: string;
  me?: IUser;
  user: IUser;
  usersConnection: IUserConnection;
  requestResetUserPassword?: boolean;
  nurseriesConnection: INurseryConnectionWithRevenues;
  nursery: INursery;
  nurseryPlanning: INurseryPlanning;
  nurseryKeyFigures: INurseryKeyFigures;
  bansConnection?: IBanConnection;
  document: IDocument;
  getDocumentUrl: string;
  child: IChild;
  customerMe: ICustomer;
  customer: ICustomerWithRegistration;
  customersConnection?: ICustomersConnection;
  reservationsConnection: IReservationConnection;
  reservation: IReservation;
  dashboard: IDashboard;
  nurseryConfig: INurseryConfig;
  registrationsConnection: IRegistrationsConnection;
  registration: IRegistration;
  mailsConnection: IMailConnection;
}

export interface IUser {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  slug: string;
  role: IRole;
  nurseries: INursery[];
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface INursery {
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
  type: INurseryType;
  tags?: INurseryTag[];
  sections?: ISection[];
  price?: number;
  schedule: ISchedule;
  visit: IVisit;
  pictures: IPicture[];
  responsibleName?: string;
  responsibleEmail?: string;
  mikadoId: string;
  registrations?: IRegistration[];
  closingDates?: IClosingDate[];
  reservations?: IReservation[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISection {
  id: string;
  code: string;
  name: string;
  ageMin: number;
  ageMax: number;
  capacity: number;
  availabilities: IAvailability[];
  nursery: INursery;
  polluxSectionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAvailability {
  id: string;
  compoundKey: string;
  section: ISection;
  remainingPlaces: number;
  date: Date;
  type: IReservationType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISchedule {
  id: string;
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
}

export interface IVisit {
  id: string;
  weekDay: number;
  start: string;
  end: string;
}

export interface IPicture {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegistration {
  id: string;
  child: IChild;
  nursery: INursery;
  status: IRegistrationStatus;
  registrationDate: Date;
  reservation?: IReservation;
  welcoming?: IWelcoming;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChild {
  id: string;
  firstName: string;
  lastName: string;
  picture?: IPicture;
  documents: IDocument[];
  allergies: IAllergy[];
  notes: string[];
  reservations?: IReservation[];
  parent: ICustomer;
  registrations?: IRegistration[];
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument {
  id: string;
  uuid: string;
  type: IDocumentType;
  status: IDocumentStatus;
  format: IDocumentFormat;
  extension: string;
  expirationDate?: Date;
  reason?: IDocumentRejectedReason;
  comment?: string;
  child?: IChild;
  parent?: ICustomer;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomer {
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
  children: IChild[];
  reservations: IReservation[];
  documents: IDocument[];
  picture?: IPicture;
  bans: IBan[];
  price?: number;
  isBanned: boolean;
  banReason?: IBanReason;
  banComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservation {
  id: string;
  status: IReservationStatus;
  statusReason?: IRejectReason;
  reasonComment?: string;
  child: IChild;
  nursery: INursery;
  section?: ISection;
  customer?: ICustomer;
  price?: number;
  type: IReservationType;
  date: Date;
  validationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBan {
  id: string;
  nursery: INursery;
  customer: ICustomer;
  reason: IBanReason;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWelcoming {
  id: string;
  date: Date;
  nursery: INursery;
  child: IChild;
  status: IWelcomingStatus;
  registration: IRegistration;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClosingDate {
  id: string;
  closingDateStart: Date;
  closingDateEnd: Date;
  polluxClosingDateId: number;
  nursery?: INursery;
}

export interface IUserWhereUniqueInput {
  id: string;
}

export interface IUserConnectionWhereInput {
  role: IRole;
  searchQuery?: string;
}

export interface IUserConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges: IUserEdge[];
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
  totalPage?: number;
}

export interface IAggregate {
  count: number;
}

export interface IUserEdge {
  node: IUser;
}

export interface INurseryConnectionWhereInput {
  search?: string;
  active?: boolean;
  orderBy?: INurseryConnectionFilterEnum;
}

export interface INurseryConnectionWithRevenues {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges: INurseryEdgeWithRevenues[];
}

export interface INurseryEdgeWithRevenues {
  node: INurseryWithRevenues;
}

export interface INurseryWithRevenues {
  id: string;
  name: string;
  pendingReservation: number;
  pendingRegistration: number;
  processed: number;
  revenues: number;
  active: boolean;
}

export interface INurseryPlanning {
  reservations: IReservation[];
  availabilities: IAvailability[];
  registrations: IRegistration[];
  welcomings?: IWelcomingExtended[];
}

export interface IWelcomingExtended {
  id: string;
  date: Date;
  child: IChildLight;
  status: IWelcomingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChildLight {
  firstName: string;
  lastName: string;
  parent: IParentLight;
}

export interface IParentLight {
  firstName: string;
  lastName: string;
}

export interface INurseryKeyFigures {
  availabilities?: number;
  revenues?: number;
  signUps?: number;
}

export interface IBansConnectionInput {
  search?: string;
  nursery?: string;
}

export interface IBanConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges?: IBanEdge[];
}

export interface IBanEdge {
  node: IBan;
}

export interface IWhereUniqueInput {
  id: string;
}

export interface ICustomerWithRegistration {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  password: string;
  children: IChild[];
  registrations?: IRegistration[];
  nurseryNumber: number;
  documents: IDocument[];
  picture?: IPicture;
  bans: IBan[];
  price?: number;
  isBanned?: boolean;
  banReason?: IBanReason;
  banComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomersConnectionWhereInput {
  search?: string;
}

export interface ICustomersConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges?: ICustomerEdge[];
}

export interface ICustomerEdge {
  node: ICustomerExtended;
}

export interface ICustomerExtended {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  password: string;
  children: IChild[];
  reservations?: IReservation[];
  nurseryNumber: number;
  documents: IDocument[];
  picture?: IPicture;
  bans: IBan[];
  price?: number;
  isBanned?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservationConnectionWhereInput {
  nursery?: INurseryWhereUniqueInput;
  customer?: ICustomerWhereUniqueInput;
  startDate?: Date;
  endDate?: Date;
  status?: IReservationStatus;
  noRegistration?: boolean;
}

export interface INurseryWhereUniqueInput {
  id: string;
}

export interface ICustomerWhereUniqueInput {
  id?: string;
  email?: string;
}

export interface IReservationConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges: IReservationEdge[];
}

export interface IReservationEdge {
  node: IReservation;
}

export interface IDashboard {
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

export interface INurseryConfig {
  id: string;
  price: number;
}

export interface IRegistrationWhereInput {
  nursery: INurseryWhereUniqueInput;
  status?: IRegistrationStatus;
}

export interface IRegistrationsConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges?: IRegistrationEdge[];
}

export interface IRegistrationEdge {
  node: IRegistration;
}

export interface IRegistrationWhereUniqueInput {
  id: string;
}

export interface IMailWhereInput {
  search?: string;
  type?: IMailType;
}

export interface IMailConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges: IMailEdge[];
}

export interface IMailEdge {
  node: IMail;
}

export interface IMail {
  id: string;
  slug: string;
  name: string;
  object: string;
  content: string;
  type: IMailType;
  variables: IVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IVariable {
  id: string;
  name: string;
  value: string;
}

export interface IMutation {
  uploadPicture: IPicture;
  deletePicture: boolean;
  login?: IAuthPayload;
  resetUserPassword?: boolean;
  updateUser?: IUser;
  activateUser?: IAuthPayload;
  deleteUser?: boolean;
  createUser?: IUser;
  _empty?: string;
  updateNursery?: INursery;
  createBan: IBan;
  deleteBan: boolean;
  createDocument: IDocument;
  updateDocument: IDocument;
  uploadDocument: IDocument;
  createChild: IChild;
  updateChild: IChild;
  deleteChild: IChild;
  customerLogin?: ICustomerLoginResponse;
  updateCustomer?: ICustomer;
  banCustomer: ICustomer;
  createReservation?: IReservation;
  updateReservation?: IReservation;
  updateNurseryConfig: INurseryConfig;
  updateRegistration: IRegistration;
  updateMail: IMail;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IAuthPayload {
  token: string;
  user: IUser;
}

export interface IResetUserPasswordInput {
  userId: string;
  password?: string;
  token?: string;
}

export interface IUpdateUserInput {
  id?: string;
  password?: string;
  nurseries?: string[];
}

export interface IActivateUserInput {
  userId: string;
  password?: string;
  token?: string;
}

export interface ICreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  nurseries?: string[];
}

export interface IUpdateNurseryInput {
  picture?: File;
  schedule?: IScheduleInput;
  visit?: IVisitInput;
  tags?: INurseryTag[];
  description?: string;
}

export interface IScheduleInput {
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
}

export interface IVisitInput {
  weekDay: number;
  start: string;
  end: string;
}

export interface ICreateBanWhereInput {
  customer: string;
  nursery: string;
}

export interface ICreateBanInput {
  reason: IBanReason;
  description?: string;
}

export interface IBanWhereUniqueInput {
  id: string;
}

export interface IDocumentStatusUpdateDataInput {
  status?: IDocumentStatus;
  reason?: IDocumentRejectedReason;
  comment?: string;
  reservation?: IReservationWhereUniqueInput;
  registration?: IRegistrationWhereUniqueInput;
}

export interface IReservationWhereUniqueInput {
  id: string;
}

export interface IDocumentCreateInput {
  file: File;
  type: IDocumentType;
}

export interface ICreateChildInput {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  allergies?: IChildAllergiesInput;
  notes?: IChildNotesInput;
  picture?: IPictureConnect;
  documents?: IDocumentCreateManyInput;
  parent: ICustomerConnect;
}

export interface IChildAllergiesInput {
  set?: IAllergy[];
}

export interface IChildNotesInput {
  set?: string[];
}

export interface IPictureConnect {
  create: IPictureCreateInput;
}

export interface IPictureCreateInput {
  id?: string;
  url: string;
}

export interface IDocumentCreateManyInput {
  create?: IDocumentCreateInput[];
}

export interface ICustomerConnect {
  connect: ICustomerWhereUniqueInput;
}

export interface IUpdateChildInput {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  allergies?: IChildAllergiesInput;
  notes?: IChildNotesInput;
  picture?: IPictureUpdateOneInput;
  documents?: IDocumentUpdateInput;
}

export interface IPictureUpdateOneInput {
  update?: IPictureUpdateDataInput;
}

export interface IPictureUpdateDataInput {
  url?: string;
}

export interface IDocumentUpdateInput {
  update?: IDocumentUpdateWithWhereUniqueNestedInput[];
}

export interface IDocumentUpdateWithWhereUniqueNestedInput {
  where: IWhereUniqueInput;
  data: IDocumentUpdateDataInput;
}

export interface IDocumentUpdateDataInput {
  url?: string;
  type?: IDocumentType;
  format?: IDocumentFormat;
  expirationDate?: Date;
  status?: IDocumentStatusUpdateOneRequiredInput;
}

export interface IDocumentStatusUpdateOneRequiredInput {
  update?: IDocumentStatusUpdateDataInput;
}

export interface ICustomerLoginInput {
  email: string;
  password: string;
}

export interface ICustomerLoginResponse {
  customer: ICustomer;
  token: string;
}

export interface ICustomerUpdateInput {
  price?: number;
  isBanned?: boolean;
}

export interface IReservationCreateInput {
  childId: string;
  nurseryId: string;
  sectionId: string;
  type: IReservationType;
  date: Date;
}

export interface IReservationUpdateInput {
  status?: IReservationStatus;
  statusReason?: IRejectReason;
  reasonComment?: string;
  price?: number;
}

export interface INurseryConfigInput {
  price: number;
}

export interface IRegistrationUpdateInput {
  status: IRegistrationStatus;
}

export interface IMailWhereUniqueInput {
  id: string;
}

export interface IMailUpdateInput {
  name?: string;
  object?: string;
  content?: string;
  type?: IMailType;
}

export interface IDocumentStatusCreateOneInput {
  create?: IDocumentStatusCreateInput;
  connect?: IWhereUniqueInput;
}

export interface IDocumentStatusCreateInput {
  id?: string;
  status: IDocumentStatus;
  reason?: IDocumentRejectedReason;
  comment?: string;
}

export interface INurseryReservationConnection {
  pageInfo: IPageInfo;
  aggregate: IAggregate;
  edges: IReservationEdge[];
}

export interface ISignupConnectionWhereInput {
  nursery?: string;
  status?: IRegistrationStatus;
  start?: Date;
  end?: Date;
}

export interface IReservationExtended {
  id: string;
  status: IReservationStatus;
  statusReason?: IRejectReason;
  requestType: IRequestType;
  child: IChild;
  nursery: INursery;
  section?: ISection;
  price?: number;
  type: IReservationType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignUpInput {
  firstName: string;
  email: string;
  password: string;
}

export interface ICustomerAuthPayload {
  token: string;
  customer: ICustomer;
}

export interface IDocumentConnectionWhereInput {
  name_contains?: string;
  type?: IDocumentType;
}

export type IRole = 'ADMIN' | 'DIRECTOR';

export type INurseryType = 'PAJE' | 'PSU';

export type INurseryTag = 'BIO_ALIMENTATION' | 'INTERNATIONNAL' | 'OUTDOOR';

export type IReservationType = 'MORNING' | 'AFTERNOON';

export type IDocumentType =
  | 'CHILD_HEALTH_RECORD'
  | 'MEDICAL_CERTIFICATE'
  | 'BIRTH_CERTIFICATE'
  | 'PARENT_ID'
  | 'INSURANCE_CARD_CERTIFICATE'
  | 'CAF_IMMATRICULATION'
  | 'INSURANCE_CERTIFICATE'
  | 'RIB';

export type IDocumentStatus = 'OK' | 'DECLINED' | 'PENDING' | 'EXPIRED';

export type IDocumentFormat = 'PDF' | 'IMAGE';

export type IDocumentRejectedReason =
  | 'UNREADABLE'
  | 'DOCUMENT_ERROR'
  | 'INCOMPLETE'
  | 'OUTDATED'
  | 'MISSING';

export type IReservationStatus = 'DONE' | 'REFUSED' | 'PENDING' | 'CANCELED' | 'EXPIRED';

export type IRejectReason = 'NO_STAFF' | 'NURSERY_CLOSED' | 'NO_SPACE' | 'BANNED_USER';

export type IBanReason = 'UNPAID' | 'CHILDREN_BEHAVIOR' | 'PARENT_BEHAVIOR' | 'RULES_FAILURE';

export type IAllergy = 'GLUTEN' | 'MILK_AND_EGGS' | 'FISH' | 'SULFUR_DIOXIDE' | 'EGGS';

export type IRegistrationStatus = 'PENDING' | 'REFUSED' | 'DONE';

export type IWelcomingStatus = 'PENDING' | 'DONE';

export type INurseryConnectionFilterEnum =
  | 'REGISTRATION_PENDING'
  | 'RESERVATION_PENDING'
  | 'REQUEST_HANDLED'
  | 'REVENUES'
  | 'NAME';

export type IMailType = 'REGISTRATION' | 'RESERVATION';

export type IRequestType = 'REGISTRATION' | 'RESERVATION';

export interface ImeArgs {}

export interface IuserArgs {
  where: IUserWhereUniqueInput;
}

export interface IusersConnectionArgs {
  where?: IUserConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface IrequestResetUserPasswordArgs {
  userId?: string;
}

export interface InurseriesConnectionArgs {
  where?: INurseryConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface InurseryArgs {
  id?: string;
}

export interface InurseryPlanningArgs {
  id: string;
  start: Date;
  end: Date;
}

export interface InurseryKeyFiguresArgs {
  id: string;
  start: Date;
  end: Date;
}

export interface IbansConnectionArgs {
  where?: IBansConnectionInput;
  page?: number;
  limit?: number;
}

export interface IdocumentArgs {
  id?: string;
}

export interface IgetDocumentUrlArgs {
  where: IWhereUniqueInput;
}

export interface IchildArgs {
  where: string;
}

export interface IcustomerMeArgs {}

export interface IcustomerArgs {
  customerId: string;
}

export interface IcustomersConnectionArgs {
  where?: ICustomersConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface IreservationsConnectionArgs {
  where?: IReservationConnectionWhereInput;
  page?: number;
  limit?: number;
}

export interface IreservationArgs {
  id: string;
}

export interface IdashboardArgs {
  start?: Date;
  end?: Date;
}

export interface InurseryConfigArgs {}

export interface IregistrationsConnectionArgs {
  where: IRegistrationWhereInput;
  page?: number;
  limit?: number;
}

export interface IregistrationArgs {
  where: IRegistrationWhereUniqueInput;
}

export interface ImailsConnectionArgs {
  where?: IMailWhereInput;
  page?: number;
  limit?: number;
}

export interface IuploadPictureArgs {
  picture: File;
}

export interface IdeletePictureArgs {
  id: string;
}

export interface IloginArgs {
  data?: ILoginInput;
}

export interface IresetUserPasswordArgs {
  data?: IResetUserPasswordInput;
}

export interface IupdateUserArgs {
  user?: IUpdateUserInput;
}

export interface IactivateUserArgs {
  data?: IActivateUserInput;
}

export interface IdeleteUserArgs {
  userId: string;
}

export interface IcreateUserArgs {
  user: ICreateUserInput;
}

export interface IupdateNurseryArgs {
  id: string;
  data: IUpdateNurseryInput;
}

export interface IcreateBanArgs {
  where: ICreateBanWhereInput;
  data: ICreateBanInput;
}

export interface IdeleteBanArgs {
  where: IBanWhereUniqueInput;
}

export interface IcreateDocumentArgs {}

export interface IupdateDocumentArgs {
  where: IWhereUniqueInput;
  data: IDocumentStatusUpdateDataInput;
}

export interface IuploadDocumentArgs {
  data: IDocumentCreateInput;
}

export interface IcreateChildArgs {
  where: string;
  data: ICreateChildInput;
}

export interface IupdateChildArgs {
  where: string;
  data: IUpdateChildInput;
}

export interface IdeleteChildArgs {
  where: string;
}

export interface IcustomerLoginArgs {
  data?: ICustomerLoginInput;
}

export interface IupdateCustomerArgs {
  where: ICustomerWhereUniqueInput;
  data: ICustomerUpdateInput;
}

export interface IbanCustomerArgs {
  where: ICustomerWhereUniqueInput;
  data: ICreateBanInput;
}

export interface IcreateReservationArgs {
  data?: IReservationCreateInput;
}

export interface IupdateReservationArgs {
  where: IReservationWhereUniqueInput;
  data: IReservationUpdateInput;
}

export interface IupdateNurseryConfigArgs {
  data: INurseryConfigInput;
}

export interface IupdateRegistrationArgs {
  where: IRegistrationWhereUniqueInput;
  data: IRegistrationUpdateInput;
}

export interface IupdateMailArgs {
  where: IMailWhereUniqueInput;
  data?: IMailUpdateInput;
}

import ApolloClient, {
  QueryOptions,
  OperationVariables,
  MutationOptions,
  ObservableQuery
} from 'apollo-client';
import { execute } from 'apollo-link';
import { OperationDefinitionNode, DocumentNode } from 'graphql';
import graphQlTag from 'graphql-tag';

type AbordableQueryWithArgs<T, A> = {
  $args(args: A): AbordableQuery<T>;
  $fetch(): Promise<T>;
  $abort(): void;
};

type AbordableQuery<T> = {
  $fetch(): Promise<T>;
  $abort(): void;
};
interface FragmentableQueryWithArgs<T, A> {
  $fragment(fragment: string | DocumentNode): AbordableQueryWithArgs<T, A>;
}
interface FragmentableQuery<T> {
  $fragment(fragment: string | DocumentNode): AbordableQuery<T>;
}

type AbordableMutationWithArgs<T, A> = {
  $args(args: A): AbordableMutation<T>;
  $post(): Promise<T>;
  $abort(): void;
};

type AbordableMutation<T> = {
  $post(): Promise<T>;
  $abort(): void;
};

interface FragmentableMutationWithArgs<T, A> {
  $fragment(fragment: string | DocumentNode): AbordableMutationWithArgs<T, A>;
}
interface FragmentableMutation<T> {
  $fragment(fragment: string | DocumentNode): AbordableMutation<T>;
}

const guessFragmentType = (fragment: string | DocumentNode) => {
  let isString,
    isFragment = false;
  let fragmentName = '';
  if (typeof fragment === 'string') {
    isString = true;
  } else if (fragment instanceof Object && fragment.definitions) {
    isFragment = true;
    if (fragment.definitions.length > 1) {
      console.error('You can only pass one raw fragment to the function');
      return;
    }
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

export const apiProvider = (apolloClient: ApolloClient<any>) => {
  const abortableQuery = <T, A = null>(
    query: DocumentNode
  ): A extends null ? AbordableQuery<T> : AbordableQueryWithArgs<T, A> => {
    let observableQuery: ZenObservable.Subscription;
    const parsedQuery = query.definitions[0] as OperationDefinitionNode;
    const queryName = parsedQuery.name.value;
    let variables: { [x: string]: any } = {};

    function $abort() {
      if (observableQuery && !observableQuery.closed) {
        observableQuery.unsubscribe();
      }
    }
    async function $fetch() {
      return new Promise<T>((resolve, reject) => {
        observableQuery = execute(apolloClient.link, {
          query,
          variables
        }).subscribe({
          next: ({ data, errors }) => {
            if (data) {
              resolve(data[queryName]);
            } else {
              reject(errors);
            }
          },
          error: error => reject(error)
        });
      });
    }
    function $args(args) {
      variables = args;
      return {
        $abort,
        $fetch
      };
    }
    return {
      $abort,
      $args
    } as any;
  };
  const abortableMutation = <T, A = null>(
    mutation: DocumentNode
  ): AbordableMutationWithArgs<T, A> => {
    let observableQuery: ZenObservable.Subscription;
    const parsedQuery = mutation.definitions[0] as OperationDefinitionNode;
    const mutationName = parsedQuery.name.value;
    let variables: { [x: string]: any } = {};

    function $abort() {
      if (observableQuery && !observableQuery.closed) {
        observableQuery.unsubscribe();
      }
    }
    async function $post() {
      return new Promise<T>((resolve, reject) => {
        observableQuery = execute(apolloClient.link, {
          query: mutation,
          variables
        }).subscribe({
          next: ({ data, errors }) => {
            if (data) {
              resolve(data[mutationName]);
            } else {
              reject(errors);
            }
          },
          error: error => reject(error)
        });
      });
    }
    function $args(args) {
      variables = args;
      return {
        $abort,
        $post
      };
    }
    return {
      $abort,
      $args
    } as any;
  };

  return {
    me: (): FragmentableQuery<IUser> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query me  {
          me {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IUser>(query);
        }
      };
    },
    user: (): FragmentableQueryWithArgs<IUser, { where: IUserWhereUniqueInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query user ($where: UserWhereUniqueInput!) {
          user(where: $where) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IUser, { where: IUserWhereUniqueInput }>(query);
        }
      };
    },
    usersConnection: (): FragmentableQueryWithArgs<
      IUserConnection,
      { where?: IUserConnectionWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query usersConnection ($where: UserConnectionWhereInput,$page: Int,$limit: Int) {
          usersConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            IUserConnection,
            { where?: IUserConnectionWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    requestResetUserPassword: (): AbordableQueryWithArgs<boolean, { userId?: string }> => {
      const query = graphQlTag`
      query requestResetUserPassword ($userId: ID) {
        requestResetUserPassword(userId: $userId)
      }`;
      return abortableQuery<boolean, { userId?: string }>(query);
    },
    nurseriesConnection: (): FragmentableQueryWithArgs<
      INurseryConnectionWithRevenues,
      { where?: INurseryConnectionWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query nurseriesConnection ($where: NurseryConnectionWhereInput,$page: Int,$limit: Int) {
          nurseriesConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            INurseryConnectionWithRevenues,
            { where?: INurseryConnectionWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    nursery: (): FragmentableQueryWithArgs<INursery, { id?: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query nursery ($id: ID) {
          nursery(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<INursery, { id?: string }>(query);
        }
      };
    },
    nurseryPlanning: (): FragmentableQueryWithArgs<
      INurseryPlanning,
      { id: string; start: Date; end: Date }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query nurseryPlanning ($id: ID!,$start: DateTime!,$end: DateTime!) {
          nurseryPlanning(id: $id,start: $start,end: $end) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<INurseryPlanning, { id: string; start: Date; end: Date }>(query);
        }
      };
    },
    nurseryKeyFigures: (): FragmentableQueryWithArgs<
      INurseryKeyFigures,
      { id: string; start: Date; end: Date }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query nurseryKeyFigures ($id: ID!,$start: DateTime!,$end: DateTime!) {
          nurseryKeyFigures(id: $id,start: $start,end: $end) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<INurseryKeyFigures, { id: string; start: Date; end: Date }>(query);
        }
      };
    },
    bansConnection: (): FragmentableQueryWithArgs<
      IBanConnection,
      { where?: IBansConnectionInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query bansConnection ($where: BansConnectionInput,$page: Int,$limit: Int) {
          bansConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            IBanConnection,
            { where?: IBansConnectionInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    document: (): FragmentableQueryWithArgs<IDocument, { id?: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query document ($id: ID) {
          document(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IDocument, { id?: string }>(query);
        }
      };
    },
    getDocumentUrl: (): AbordableQueryWithArgs<string, { where: IWhereUniqueInput }> => {
      const query = graphQlTag`
      query getDocumentUrl ($where: WhereUniqueInput!) {
        getDocumentUrl(where: $where)
      }`;
      return abortableQuery<string, { where: IWhereUniqueInput }>(query);
    },
    child: (): FragmentableQueryWithArgs<IChild, { where: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query child ($where: ID!) {
          child(where: $where) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IChild, { where: string }>(query);
        }
      };
    },
    customerMe: (): FragmentableQuery<ICustomer> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query customerMe  {
          customerMe {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<ICustomer>(query);
        }
      };
    },
    customer: (): FragmentableQueryWithArgs<ICustomerWithRegistration, { customerId: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query customer ($customerId: ID!) {
          customer(customerId: $customerId) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<ICustomerWithRegistration, { customerId: string }>(query);
        }
      };
    },
    customersConnection: (): FragmentableQueryWithArgs<
      ICustomersConnection,
      { where?: ICustomersConnectionWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query customersConnection ($where: CustomersConnectionWhereInput,$page: Int,$limit: Int) {
          customersConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            ICustomersConnection,
            { where?: ICustomersConnectionWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    reservationsConnection: (): FragmentableQueryWithArgs<
      IReservationConnection,
      { where?: IReservationConnectionWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query reservationsConnection ($where: ReservationConnectionWhereInput,$page: Int,$limit: Int) {
          reservationsConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            IReservationConnection,
            { where?: IReservationConnectionWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    reservation: (): FragmentableQueryWithArgs<IReservation, { id: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query reservation ($id: ID!) {
          reservation(id: $id) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IReservation, { id: string }>(query);
        }
      };
    },
    dashboard: (): FragmentableQueryWithArgs<IDashboard, { start?: Date; end?: Date }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query dashboard ($start: DateTime,$end: DateTime) {
          dashboard(start: $start,end: $end) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IDashboard, { start?: Date; end?: Date }>(query);
        }
      };
    },
    nurseryConfig: (): FragmentableQuery<INurseryConfig> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query nurseryConfig  {
          nurseryConfig {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<INurseryConfig>(query);
        }
      };
    },
    registrationsConnection: (): FragmentableQueryWithArgs<
      IRegistrationsConnection,
      { where: IRegistrationWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query registrationsConnection ($where: RegistrationWhereInput!,$page: Int,$limit: Int) {
          registrationsConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            IRegistrationsConnection,
            { where: IRegistrationWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    registration: (): FragmentableQueryWithArgs<
      IRegistration,
      { where: IRegistrationWhereUniqueInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query registration ($where: RegistrationWhereUniqueInput!) {
          registration(where: $where) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<IRegistration, { where: IRegistrationWhereUniqueInput }>(query);
        }
      };
    },
    mailsConnection: (): FragmentableQueryWithArgs<
      IMailConnection,
      { where?: IMailWhereInput; page?: number; limit?: number }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const query = graphQlTag`
           query mailsConnection ($where: MailWhereInput,$page: Int,$limit: Int) {
          mailsConnection(where: $where,page: $page,limit: $limit) {
            ${isString ? fragment : '...' + fragmentName}
            
          }
        } ${isFragment ? fragment : ''}
        `;
          return abortableQuery<
            IMailConnection,
            { where?: IMailWhereInput; page?: number; limit?: number }
          >(query);
        }
      };
    },
    uploadPicture: (): FragmentableMutationWithArgs<IPicture, { picture: File }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation uploadPicture ($picture: Upload!) {
        uploadPicture(picture: $picture) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IPicture, { picture: File }>(mutation);
        }
      };
    },
    deletePicture: (): AbordableMutationWithArgs<boolean, { id: string }> => {
      const mutation = graphQlTag`
      mutation deletePicture ($id: ID!) {
        deletePicture(id: $id)
      }`;
      return abortableMutation<boolean>(mutation);
    },
    login: (): FragmentableMutationWithArgs<IAuthPayload, { data?: ILoginInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation login ($data: LoginInput) {
        login(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IAuthPayload, { data?: ILoginInput }>(mutation);
        }
      };
    },
    resetUserPassword: (): AbordableMutationWithArgs<
      boolean,
      { data?: IResetUserPasswordInput }
    > => {
      const mutation = graphQlTag`
      mutation resetUserPassword ($data: ResetUserPasswordInput) {
        resetUserPassword(data: $data)
      }`;
      return abortableMutation<boolean>(mutation);
    },
    updateUser: (): FragmentableMutationWithArgs<IUser, { user?: IUpdateUserInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateUser ($user: UpdateUserInput) {
        updateUser(user: $user) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IUser, { user?: IUpdateUserInput }>(mutation);
        }
      };
    },
    activateUser: (): FragmentableMutationWithArgs<IAuthPayload, { data?: IActivateUserInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation activateUser ($data: ActivateUserInput) {
        activateUser(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IAuthPayload, { data?: IActivateUserInput }>(mutation);
        }
      };
    },
    deleteUser: (): AbordableMutationWithArgs<boolean, { userId: string }> => {
      const mutation = graphQlTag`
      mutation deleteUser ($userId: ID!) {
        deleteUser(userId: $userId)
      }`;
      return abortableMutation<boolean>(mutation);
    },
    createUser: (): FragmentableMutationWithArgs<IUser, { user: ICreateUserInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation createUser ($user: CreateUserInput!) {
        createUser(user: $user) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IUser, { user: ICreateUserInput }>(mutation);
        }
      };
    },
    updateNursery: (): FragmentableMutationWithArgs<
      INursery,
      { id: string; data: IUpdateNurseryInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateNursery ($id: ID!,$data: UpdateNurseryInput!) {
        updateNursery(id: $id,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<INursery, { id: string; data: IUpdateNurseryInput }>(mutation);
        }
      };
    },
    createBan: (): FragmentableMutationWithArgs<
      IBan,
      { where: ICreateBanWhereInput; data: ICreateBanInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation createBan ($where: CreateBanWhereInput!,$data: CreateBanInput!) {
        createBan(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IBan, { where: ICreateBanWhereInput; data: ICreateBanInput }>(
            mutation
          );
        }
      };
    },
    deleteBan: (): AbordableMutationWithArgs<boolean, { where: IBanWhereUniqueInput }> => {
      const mutation = graphQlTag`
      mutation deleteBan ($where: BanWhereUniqueInput!) {
        deleteBan(where: $where)
      }`;
      return abortableMutation<boolean>(mutation);
    },
    createDocument: (): FragmentableMutation<IDocument> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation createDocument  {
        createDocument {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IDocument>(mutation);
        }
      };
    },
    updateDocument: (): FragmentableMutationWithArgs<
      IDocument,
      { where: IWhereUniqueInput; data: IDocumentStatusUpdateDataInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateDocument ($where: WhereUniqueInput!,$data: DocumentStatusUpdateDataInput!) {
        updateDocument(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            IDocument,
            { where: IWhereUniqueInput; data: IDocumentStatusUpdateDataInput }
          >(mutation);
        }
      };
    },
    uploadDocument: (): FragmentableMutationWithArgs<IDocument, { data: IDocumentCreateInput }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation uploadDocument ($data: DocumentCreateInput!) {
        uploadDocument(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IDocument, { data: IDocumentCreateInput }>(mutation);
        }
      };
    },
    createChild: (): FragmentableMutationWithArgs<
      IChild,
      { where: string; data: ICreateChildInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation createChild ($where: ID!,$data: CreateChildInput!) {
        createChild(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IChild, { where: string; data: ICreateChildInput }>(mutation);
        }
      };
    },
    updateChild: (): FragmentableMutationWithArgs<
      IChild,
      { where: string; data: IUpdateChildInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateChild ($where: ID!,$data: UpdateChildInput!) {
        updateChild(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IChild, { where: string; data: IUpdateChildInput }>(mutation);
        }
      };
    },
    deleteChild: (): FragmentableMutationWithArgs<IChild, { where: string }> => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation deleteChild ($where: ID!) {
        deleteChild(where: $where) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IChild, { where: string }>(mutation);
        }
      };
    },
    customerLogin: (): FragmentableMutationWithArgs<
      ICustomerLoginResponse,
      { data?: ICustomerLoginInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation customerLogin ($data: CustomerLoginInput) {
        customerLogin(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<ICustomerLoginResponse, { data?: ICustomerLoginInput }>(
            mutation
          );
        }
      };
    },
    updateCustomer: (): FragmentableMutationWithArgs<
      ICustomer,
      { where: ICustomerWhereUniqueInput; data: ICustomerUpdateInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateCustomer ($where: CustomerWhereUniqueInput!,$data: CustomerUpdateInput!) {
        updateCustomer(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            ICustomer,
            { where: ICustomerWhereUniqueInput; data: ICustomerUpdateInput }
          >(mutation);
        }
      };
    },
    banCustomer: (): FragmentableMutationWithArgs<
      ICustomer,
      { where: ICustomerWhereUniqueInput; data: ICreateBanInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation banCustomer ($where: CustomerWhereUniqueInput!,$data: CreateBanInput!) {
        banCustomer(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            ICustomer,
            { where: ICustomerWhereUniqueInput; data: ICreateBanInput }
          >(mutation);
        }
      };
    },
    createReservation: (): FragmentableMutationWithArgs<
      IReservation,
      { data?: IReservationCreateInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation createReservation ($data: ReservationCreateInput) {
        createReservation(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<IReservation, { data?: IReservationCreateInput }>(mutation);
        }
      };
    },
    updateReservation: (): FragmentableMutationWithArgs<
      IReservation,
      { where: IReservationWhereUniqueInput; data: IReservationUpdateInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateReservation ($where: ReservationWhereUniqueInput!,$data: ReservationUpdateInput!) {
        updateReservation(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            IReservation,
            { where: IReservationWhereUniqueInput; data: IReservationUpdateInput }
          >(mutation);
        }
      };
    },
    updateNurseryConfig: (): FragmentableMutationWithArgs<
      INurseryConfig,
      { data: INurseryConfigInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateNurseryConfig ($data: NurseryConfigInput!) {
        updateNurseryConfig(data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<INurseryConfig, { data: INurseryConfigInput }>(mutation);
        }
      };
    },
    updateRegistration: (): FragmentableMutationWithArgs<
      IRegistration,
      { where: IRegistrationWhereUniqueInput; data: IRegistrationUpdateInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateRegistration ($where: RegistrationWhereUniqueInput!,$data: RegistrationUpdateInput!) {
        updateRegistration(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            IRegistration,
            { where: IRegistrationWhereUniqueInput; data: IRegistrationUpdateInput }
          >(mutation);
        }
      };
    },
    updateMail: (): FragmentableMutationWithArgs<
      IMail,
      { where: IMailWhereUniqueInput; data?: IMailUpdateInput }
    > => {
      return {
        $fragment: (fragment: string | DocumentNode) => {
          const { isString, isFragment, fragmentName } = guessFragmentType(fragment);
          const mutation = graphQlTag`
         mutation updateMail ($where: MailWhereUniqueInput!,$data: MailUpdateInput) {
        updateMail(where: $where,data: $data) {
          ${isString ? fragment : '...' + fragmentName}
          
        }
      } ${isFragment ? fragment : ''}
      `;

          return abortableMutation<
            IMail,
            { where: IMailWhereUniqueInput; data?: IMailUpdateInput }
          >(mutation);
        }
      };
    }
  };
};
