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

export interface Query {
  audiotracksConnection: AudiotrackConnection;
  audiotrack: Audiotrack;
  commentsConnection: CommentConnection;
  comment: Comment;
  funfactsConnection: FunfactConnection;
  funfact: Funfact;
  snippetsConnection: SnippetConnection;
  snippet: Snippet;
  currenciesConnection: CurrencyConnection;
  currency: Currency;
  countriesConnection: CountryConnection;
  countries: Country[];
  country: Country;
  citiesConnection: CityConnection;
  cities: City[];
  city: City;
  categoriesConnection: CategoryConnection;
  categories: Category[];
  category: Category;
  personsConnection: PersonConnection;
  persons: Person[];
  person: Person;
  tracksConnection: TrackConnection;
  track: Track;
  waypoints: Waypoint[];
  waypoint: Waypoint;
  login?: UserWithToken;
  me: Admin;
  adminsConnection: AdminConnection;
  admin: Admin;
  usersConnection: UserConnection;
  user: User;
}

export interface AudiotrackWhereInput {
  id?: string;
  code?: string;
  code_contains?: string;
  name_contains?: string;
  file_contains?: string;
  createdAt_lt?: string;
  createdAt_lte?: string;
  createdAt_gt?: string;
  createdAt_gte?: string;
  updatedAt_lt?: string;
  updatedAt_lte?: string;
  updatedAt_gt?: string;
  updatedAt_gte?: string;
  AND?: AudiotrackWhereInput[];
  OR?: AudiotrackWhereInput[];
  NOT?: AudiotrackWhereInput[];
}

export interface AudiotrackConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: AudiotrackEdge[];
}

export interface PageInfo {
  page: number;
  limit?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Aggregate {
  count: number;
}

export interface AudiotrackEdge {
  node: Audiotrack;
  cursor: string;
}

export interface Audiotrack {
  id: string;
  code?: string;
  name: string;
  file: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AudiotrackWhereUniqueInput {
  id: string;
}

export interface CommentWhereInput {
  id?: string;
  author?: UserWhereUniqueInput;
  track?: TrackWhereUniqueInput;
  score?: number;
  score_lt?: number;
  score_lte?: number;
  score_gt?: number;
  score_gte?: number;
  createdAt_lt?: string;
  createdAt_lte?: string;
  createdAt_gt?: string;
  createdAt_gte?: string;
  updatedAt_lt?: string;
  updatedAt_lte?: string;
  updatedAt_gt?: string;
  updatedAt_gte?: string;
  AND?: CommentWhereInput[];
  OR?: CommentWhereInput[];
  NOT?: CommentWhereInput[];
}

export interface UserWhereUniqueInput {
  id: string;
  email?: string;
}

export interface TrackWhereUniqueInput {
  id: string;
}

export interface CommentConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: CommentEdge[];
}

export interface CommentEdge {
  node: Comment;
  cursor: string;
}

export interface Comment {
  id: string;
  author: User;
  track: Track;
  content?: string;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  birthdate: string;
  phone: string;
  city: string;
  country: string;
  locale: Locale;
  status: UserStatus;
  terms?: boolean;
  enableNotifications?: boolean;
  enableSounds?: boolean;
  enableVibrations?: boolean;
  funfactPlayMode: FunfactPlayMode;
  favorites: Favorite[];
  comments: Comment[];
  purchases: Purchase[];
  abonnements: Abonnement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  user: User;
  comment?: string;
  track?: Track;
  funfact?: Funfact;
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  price?: number;
  duration: number;
  length: number;
  recommendedVisitingHours?: string;
  description: string;
  coverImage: string;
  locationImage?: string;
  visitedPlaces?: string;
  guide: Person;
  voice: Person;
  city: City;
  medias: Media[];
  waypoints: Waypoint[];
  comments: Comment[];
  mapGeometry?: TrackMapGeometry;
  mapboxRoutes?: string;
  status: ToggleStatus;
  favorite?: Favorite;
  isPurchased?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  code?: string;
  name: string;
  status: ToggleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Person {
  id: string;
  type: PersonType;
  firstname: string;
  lastname: string;
  avatar?: string;
  video?: string;
  description: string;
  content?: string;
  status: ToggleStatus;
  tracksGuide: Track[];
  tracksVoice: Track[];
  funfactsGuide: Funfact[];
  funfactsVoice: Funfact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Funfact {
  id: string;
  name: string;
  category: Category;
  price?: number;
  description: string;
  voice: Person;
  city: City;
  guide: Person;
  point: Point;
  image?: string;
  audiotrack?: Audiotrack;
  status: ToggleStatus;
  favorite?: Favorite;
  isPurchased?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  code: string;
  country: Country;
  officialNameEn?: string;
  officialNameFr?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  alpha2?: string;
  alpha3?: string;
  officialNameEn?: string;
  officialNameFr?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Point {
  id: string;
  lat: number;
  lng: number;
  formattedAddress?: string;
  funfact?: Funfact;
  waypoint?: Waypoint;
}

export interface Waypoint {
  id: string;
  name?: string;
  type: WaypointType;
  direction: WaypointDirection;
  directionDescription?: string;
  point: Point;
  audiotrack?: Audiotrack;
  letter?: string;
  chapter?: string;
  image?: string;
  video?: string;
  track?: Track;
  position?: number;
  seen: boolean;
  skipped: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: string;
  type: MediaType;
  file: string;
  isTeaser: boolean;
}

export interface TrackMapGeometry {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  centerLat: number;
  centerLng: number;
}

export interface Purchase {
  id: string;
  user: User;
  status: PaymentStatus;
  purchaseType: PurchaseType;
  paymentType: MobilePlatform;
  track?: Track;
  funfact?: Funfact;
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Abonnement {
  id: string;
  user: User;
  status: PaymentStatus;
  paymentType: MobilePlatform;
  receipt?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentWhereUniqueInput {
  id: string;
}

export interface FunfactWhereInput {
  id?: string;
  name_contains?: string;
  category?: CategoryWhereInput;
  price_lt?: number;
  price_lte?: number;
  price_gt?: number;
  price_gte?: number;
  description_contains?: string;
  voice?: PersonWhereInput;
  guide?: PersonWhereInput;
  city?: CityWhereInput;
  status?: ToggleStatus;
  status_not?: ToggleStatus;
  status_in?: ToggleStatus[];
  status_not_in?: ToggleStatus[];
  createdAt_lt?: string;
  createdAt_lte?: string;
  createdAt_gt?: string;
  createdAt_gte?: string;
  updatedAt_lt?: string;
  updatedAt_lte?: string;
  updatedAt_gt?: string;
  updatedAt_gte?: string;
  AND?: FunfactWhereInput[];
  OR?: FunfactWhereInput[];
  NOT?: FunfactWhereInput[];
}

export interface CategoryWhereInput {
  id?: string;
  id_in?: string[];
  code?: string;
  name_contains?: string;
}

export interface PersonWhereInput {
  type?: PersonType;
  type_not?: PersonType;
  type_in?: PersonType[];
  type_not_in?: PersonType[];
  tracksGuide_every?: TrackWhereInput;
  tracksGuide_some?: TrackWhereInput;
  tracksGuide_none?: TrackWhereInput;
  tracksVoice_every?: TrackWhereInput;
  tracksVoice_some?: TrackWhereInput;
  tracksVoice_none?: TrackWhereInput;
  funfactsGuide_every?: FunfactWhereInput;
  funfactsGuide_some?: FunfactWhereInput;
  funfactsGuide_none?: FunfactWhereInput;
  funfactsVoice_every?: FunfactWhereInput;
  funfactsVoice_some?: FunfactWhereInput;
  funfactsVoice_none?: FunfactWhereInput;
  firstname_contains?: string;
  lastname_contains?: string;
  status?: ToggleStatus;
  status_not?: ToggleStatus;
  status_in?: ToggleStatus;
  status_not_in?: ToggleStatus;
}

export interface TrackWhereInput {
  id?: string;
  name_contains?: string;
  category?: CategoryWhereInput;
  price_lt?: number;
  price_lte?: number;
  price_gt?: number;
  price_gte?: number;
  duration_lt?: number;
  duration_lte?: number;
  duration_gt?: number;
  duration_gte?: number;
  length_lt?: number;
  length_lte?: number;
  length_gt?: number;
  length_gte?: number;
  guide?: PersonWhereInput;
  voice?: PersonWhereInput;
  city?: CityWhereInput;
  status?: ToggleStatus;
  createdAt_lt?: string;
  createdAt_lte?: string;
  createdAt_gt?: string;
  createdAt_gte?: string;
  updatedAt_lt?: string;
  updatedAt_lte?: string;
  updatedAt_gt?: string;
  updatedAt_gte?: string;
  AND?: TrackWhereInput[];
  OR?: TrackWhereInput[];
  NOT?: TrackWhereInput[];
}

export interface CityWhereInput {
  name_contains?: string;
  country?: CountryWhereInput;
  officialNameEn_contains?: string;
  officialNameFr_contains?: string;
}

export interface CountryWhereInput {
  name_contains?: string;
  officialNameEn_contains?: string;
  officialNameFr_contains?: string;
}

export interface FunfactConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: FunfactEdge[];
}

export interface FunfactEdge {
  node: Funfact;
  cursor: string;
}

export interface FunfactWhereUniqueInput {
  id: string;
}

export interface SnippetWhereInput {
  id?: string;
  code?: string;
}

export interface SnippetConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: SnippetEdge[];
}

export interface SnippetEdge {
  node: Snippet;
}

export interface Snippet {
  id: string;
  code: string;
  contents: SnippetContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetContent {
  locale: Locale;
  title: string;
  description?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetWhereUniqueInput {
  id?: string;
  code?: string;
}

export interface CurrencyWhereInput {
  name_contains?: string;
}

export interface CurrencyConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: CurrencyEdge[];
}

export interface CurrencyEdge {
  node: Currency;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrencyWhereUniqueInput {
  id?: string;
  code?: string;
}

export interface CountryConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: CountryEdge[];
}

export interface CountryEdge {
  node: Country;
}

export interface CountryWhereUniqueInput {
  id?: string;
  code?: string;
  alpha3?: string;
}

export interface CityConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: CityEdge[];
}

export interface CityEdge {
  node: City;
}

export interface CityWhereUniqueInput {
  id?: string;
  code?: string;
}

export interface AdminCategoryWhereInput {
  id?: string;
  code_contains?: string;
  name?: string;
  name_not?: string;
  name_in?: string[];
  name_not_in?: string[];
  name_contains?: string;
  name_starts_with?: string;
  status?: ToggleStatus;
  status_not?: ToggleStatus;
  status_in?: ToggleStatus[];
  status_not_in?: ToggleStatus[];
  AND?: AdminCategoryWhereInput[];
  OR?: AdminCategoryWhereInput[];
  NOT?: AdminCategoryWhereInput[];
}

export interface CategoryConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: CategoryEdge[];
}

export interface CategoryEdge {
  node: Category;
  cursor: string;
}

export interface CategoryWhereUniqueInput {
  id?: string;
  code?: string;
}

export interface AdminPersonWhereInput {
  id?: string;
  type?: PersonType;
  type_not?: PersonType;
  type_in?: PersonType[];
  type_not_in?: PersonType[];
  firstname?: string;
  firstname_contains?: string;
  firstname_starts_with?: string;
  lastname?: string;
  lastname_contains?: string;
  lastname_starts_with?: string;
  status?: ToggleStatus;
  status_not?: ToggleStatus;
  status_in?: ToggleStatus[];
  status_not_in?: ToggleStatus[];
  createdAt?: string;
  createdAt_lt?: string;
  createdAt_lte?: string;
  createdAt_gt?: string;
  createdAt_gte?: string;
  updatedAt?: string;
  updatedAt_lt?: string;
  updatedAt_lte?: string;
  updatedAt_gt?: string;
  updatedAt_gte?: string;
  AND?: AdminPersonWhereInput[];
  OR?: AdminPersonWhereInput[];
  NOT?: AdminPersonWhereInput[];
}

export interface PersonConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: PersonEdge[];
}

export interface PersonEdge {
  node: Person;
  cursor: string;
}

export interface PersonWhereUniqueInput {
  id: string;
}

export interface TrackConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: TrackEdge[];
}

export interface TrackEdge {
  node: Track;
  cursor: string;
}

export interface AdminWaypointWhereInput {
  name_contains?: string;
  type?: WaypointType;
  type_not?: WaypointType;
  type_in?: WaypointType[];
  type_not_in?: WaypointType[];
  letter?: string;
  chapter_contains?: string;
  track: TrackWhereUniqueInput;
  AND?: WaypointWhereInput[];
  OR?: WaypointWhereInput[];
  NOT?: WaypointWhereInput[];
}

export interface WaypointWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  type?: WaypointType;
  type_not?: WaypointType;
  type_in?: WaypointType[];
  type_not_in?: WaypointType[];
  point?: PointWhereInput;
  audio?: AudiotrackWhereInput;
  letter?: string;
  letter_not?: string;
  letter_in?: string[];
  letter_not_in?: string[];
  letter_lt?: string;
  letter_lte?: string;
  letter_gt?: string;
  letter_gte?: string;
  letter_contains?: string;
  letter_not_contains?: string;
  letter_starts_with?: string;
  letter_not_starts_with?: string;
  letter_ends_with?: string;
  letter_not_ends_with?: string;
  chapter?: string;
  chapter_not?: string;
  chapter_in?: string[];
  chapter_not_in?: string[];
  chapter_lt?: string;
  chapter_lte?: string;
  chapter_gt?: string;
  chapter_gte?: string;
  chapter_contains?: string;
  chapter_not_contains?: string;
  chapter_starts_with?: string;
  chapter_not_starts_with?: string;
  chapter_ends_with?: string;
  chapter_not_ends_with?: string;
  image?: string;
  image_not?: string;
  image_in?: string[];
  image_not_in?: string[];
  image_lt?: string;
  image_lte?: string;
  image_gt?: string;
  image_gte?: string;
  image_contains?: string;
  image_not_contains?: string;
  image_starts_with?: string;
  image_not_starts_with?: string;
  image_ends_with?: string;
  image_not_ends_with?: string;
  video?: string;
  video_not?: string;
  video_in?: string[];
  video_not_in?: string[];
  video_lt?: string;
  video_lte?: string;
  video_gt?: string;
  video_gte?: string;
  video_contains?: string;
  video_not_contains?: string;
  video_starts_with?: string;
  video_not_starts_with?: string;
  video_ends_with?: string;
  video_not_ends_with?: string;
  track?: TrackWhereInput;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: WaypointWhereInput[];
  OR?: WaypointWhereInput[];
  NOT?: WaypointWhereInput[];
}

export interface PointWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  lat?: number;
  lat_not?: number;
  lat_in?: number[];
  lat_not_in?: number[];
  lat_lt?: number;
  lat_lte?: number;
  lat_gt?: number;
  lat_gte?: number;
  lng?: number;
  lng_not?: number;
  lng_in?: number[];
  lng_not_in?: number[];
  lng_lt?: number;
  lng_lte?: number;
  lng_gt?: number;
  lng_gte?: number;
  funfact?: FunfactWhereInput;
  waypoint?: WaypointWhereInput;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: PointWhereInput[];
  OR?: PointWhereInput[];
  NOT?: PointWhereInput[];
}

export interface WaypointWhereUniqueInput {
  id: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface UserWithToken {
  user: Me;
  token: string;
}

export interface Me {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  birthdate?: string;
  phone?: string;
  city?: string;
  country?: string;
  locale: Locale;
  status: UserStatus;
  terms?: boolean;
  enableNotifications?: boolean;
  enableSounds?: boolean;
  enableVibrations?: boolean;
  funfactPlayMode: FunfactPlayMode;
  favorites: Favorite[];
  comments: Comment[];
  purchases: Purchase[];
  abonnements: Abonnement[];
  remainingFreeFunfacts: number;
  remainingFreeTracks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminWhereInput {
  id?: string;
  email_contains?: string;
  username_contains?: string;
  AND?: AdminWhereInput[];
  OR?: AdminWhereInput[];
  NOT?: AdminWhereInput[];
}

export interface AdminConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: AdminEdge[];
}

export interface AdminEdge {
  node: Admin;
}

export interface AdminWhereUniqueInput {
  id?: string;
  email?: string;
}

export interface AdminUserWhereInput {
  id?: string;
  email?: string;
  email_contains?: string;
  email_starts_with?: string;
  username?: string;
  username_contains?: string;
  username_starts_with?: string;
  firstname?: string;
  firstname_contains?: string;
  firstname_starts_with?: string;
  lastname?: string;
  lastname_contains?: string;
  lastname_starts_with?: string;
  gender?: Gender;
  gender_not?: Gender;
  gender_in?: Gender[];
  gender_not_in?: Gender[];
  birthdate?: string;
  birthdate_lt?: string;
  birthdate_lte?: string;
  birthdate_gt?: string;
  birthdate_gte?: string;
  phone?: string;
  phone_contains?: string;
  phone_starts_with?: string;
  phone_ends_with?: string;
  city?: string;
  country?: CountryWhereInput;
  locale?: Locale;
  locale_not?: Locale;
  locale_in?: Locale[];
  locale_not_in?: Locale[];
  role?: Role;
  role_not?: Role;
  role_in?: Role[];
  role_not_in?: Role[];
  status?: UserStatus;
  status_not?: UserStatus;
  status_in?: UserStatus[];
  status_not_in?: UserStatus[];
  terms?: boolean;
  terms_not?: boolean;
  AND?: AdminUserWhereInput[];
  OR?: AdminUserWhereInput[];
  NOT?: AdminUserWhereInput[];
}

export interface UserConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges: UserEdge[];
}

export interface UserEdge {
  node: User;
}

export interface Mutation {
  createAudiotrack: Audiotrack;
  updateAudiotrack: Audiotrack;
  deleteAudiotrack?: Audiotrack;
  updateComment: Comment;
  deleteComment?: Comment;
  createFunfact: Funfact;
  updateFunfact: Funfact;
  deleteFunfact?: Funfact;
  createSnippet: Snippet;
  updateSnippet: Snippet;
  deleteSnippet?: Snippet;
  createCurrency: Currency;
  updateCurrency: Currency;
  deleteCurrency?: Currency;
  createCountry: Country;
  updateCountry: Country;
  deleteCountry?: Country;
  createCity: City;
  updateCity: City;
  deleteCity?: City;
  createCategory: Category;
  updateCategory: Category;
  deleteCategory?: Category;
  createPerson: Person;
  updatePerson: Person;
  deletePerson?: Person;
  createTrack: Track;
  updateTrack: Track;
  deleteTrack?: Track;
  createWaypoint: Waypoint;
  updateWaypoint: Waypoint;
  deleteWaypoint?: Waypoint;
  updateManyWaypoints: BatchPayload;
  createAdmin: Admin;
  updateAdmin: Admin;
  deleteAdmin?: Admin;
  updateUser: User;
  deleteUser?: User;
}

export interface AudiotrackCreateInput {
  code?: string;
  name: string;
  file: File;
}

export interface AudiotrackUpdateInput {
  code?: string;
  name?: string;
  file?: File;
}

export interface CommentUpdateInput {
  content?: string;
  score?: number;
}

export interface FunfactCreateInput {
  name: string;
  category: CategoryCreateOneInput;
  price?: number;
  description: string;
  voice: PersonCreateOneInput;
  guide: PersonCreateOneInput;
  city: CityCreateOneInput;
  point: PointCreateOneWithoutRelationInput;
  image?: File;
  audiotrack: AudiotrackCreateOneInput;
  status?: ToggleStatus;
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput;
  connect?: CategoryWhereUniqueInput;
}

export interface CategoryCreateInput {
  code?: string;
  name: string;
  status?: ToggleStatus;
}

export interface PersonCreateOneInput {
  connect?: PersonWhereUniqueInput;
}

export interface CityCreateOneInput {
  create?: CityCreateInput;
  connect?: CityWhereUniqueInput;
}

export interface CityCreateInput {
  name: string;
  code: string;
  country: CountryCreateOneInput;
  officialNameEn?: string;
  officialNameFr?: string;
}

export interface CountryCreateOneInput {
  create?: CountryCreateInput;
  connect?: CountryWhereUniqueInput;
}

export interface CountryCreateInput {
  name: string;
  code: string;
  alpha2?: string;
  alpha3?: string;
  officialNameEn?: string;
  officialNameFr?: string;
}

export interface PointCreateOneWithoutRelationInput {
  create?: PointCreateInput;
}

export interface PointCreateInput {
  lat: number;
  lng: number;
  formattedAddress?: string;
}

export interface AudiotrackCreateOneInput {
  create?: AudiotrackCreateInput;
  connect?: AudiotrackWhereUniqueInput;
}

export interface FunfactUpdateInput {
  name?: string;
  category?: CategoryCreateOneInput;
  price?: number;
  description?: string;
  voice?: PersonUpdateOneRequiredInput;
  guide?: PersonUpdateOneRequiredInput;
  city?: CityCreateOneInput;
  point?: PointUpdateOneRequiredWithoutRelationInput;
  image?: File;
  audiotrack?: AudiotrackUpdateOneInput;
  status?: ToggleStatus;
}

export interface PersonUpdateOneRequiredInput {
  connect?: PersonWhereUniqueInput;
}

export interface PointUpdateOneRequiredWithoutRelationInput {
  update?: PointUpdateInput;
}

export interface PointUpdateInput {
  lat?: number;
  lng?: number;
  formattedAddress?: string;
}

export interface AudiotrackUpdateOneInput {
  update?: AudiotrackUpdateInput;
  connect?: AudiotrackWhereUniqueInput;
}

export interface SnippetCreateInput {
  code: string;
  contents: SnippetContentsInput;
}

export interface SnippetContentsInput {
  set?: SnippetContentDataInput[];
}

export interface SnippetContentDataInput {
  locale: Locale;
  title: string;
  description?: string;
  content?: string;
}

export interface SnippetUpdateInput {
  code?: string;
  contents?: SnippetContentsInput;
}

export interface CurrencyCreateInput {
  code: string;
  name: string;
  symbol: string;
}

export interface CurrencyUpdateInput {
  code?: string;
  name?: string;
  symbol?: string;
}

export interface CountryUpdateInput {
  name?: string;
  code?: string;
  alpha2?: string;
  alpha3?: string;
  officialNameEn?: string;
  officialNameFr?: string;
}

export interface CityUpdateInput {
  name?: string;
  code?: string;
  country?: CountryUpdateOneRequiredInput;
  officialNameEn?: string;
  officialNameFr?: string;
}

export interface CountryUpdateOneRequiredInput {
  create?: CountryCreateInput;
  update?: CountryUpdateInput;
  upsert?: CountryUpsertNestedInput;
  connect?: CountryWhereUniqueInput;
}

export interface CountryUpsertNestedInput {
  update: CountryUpdateInput;
  create: CountryCreateInput;
}

export interface CategoryUpdateInput {
  code?: string;
  name?: string;
  status?: ToggleStatus;
}

export interface PersonCreateInput {
  type?: PersonType;
  firstname: string;
  lastname: string;
  avatar?: File;
  video?: File;
  description: string;
  content?: string;
  status?: ToggleStatus;
}

export interface PersonUpdateInput {
  type?: PersonType;
  firstname?: string;
  lastname?: string;
  avatar?: File;
  video?: File;
  description?: string;
  content?: string;
  status?: ToggleStatus;
}

export interface TrackCreateInput {
  name: string;
  subtitle: string;
  category: CategoryCreateOneInput;
  price?: number;
  duration: number;
  length: number;
  recommendedVisitingHours?: string;
  description: string;
  coverImage?: File;
  locationImage?: File;
  visitedPlaces?: string;
  guide: PersonCreateOneInput;
  voice: PersonCreateOneInput;
  city: CityCreateOneInput;
  waypoints?: WaypointCreateManyWithoutTrackInput;
  status?: ToggleStatus;
}

export interface WaypointCreateManyWithoutTrackInput {
  create?: WaypointCreateWithoutTrackInput[];
  connect?: WaypointWhereUniqueInput[];
}

export interface WaypointCreateWithoutTrackInput {
  name?: string;
  type: WaypointType;
  point: PointCreateOneWithoutRelationInput;
  audiotrack?: AudiotrackCreateOneInput;
  letter?: string;
  chapter?: string;
  image?: File;
  video?: File;
  position?: number;
}

export interface TrackUpdateInput {
  name?: string;
  subtitle?: string;
  category?: CategoryCreateOneInput;
  price?: number;
  duration?: number;
  length?: number;
  recommendedVisitingHours?: string;
  description?: string;
  coverImage?: File;
  locationImage?: File;
  visitedPlaces?: string;
  guide?: PersonCreateOneInput;
  voice?: PersonCreateOneInput;
  city?: CityCreateOneInput;
  waypoints?: WaypointUpdateManyWithoutTrackInput;
  status?: ToggleStatus;
}

export interface WaypointUpdateManyWithoutTrackInput {
  create?: WaypointCreateWithoutTrackInput[];
  delete?: WaypointWhereUniqueInput[];
  set?: WaypointWhereUniqueInput[];
  disconnect?: WaypointWhereUniqueInput[];
  update?: WaypointUpdateWithWhereUniqueWithoutTrackInput[];
  updateMany?: WaypointUpdateManyWithWhereNestedInput[];
}

export interface WaypointUpdateWithWhereUniqueWithoutTrackInput {
  where: WaypointWhereUniqueInput;
  data: WaypointUpdateInput;
}

export interface WaypointUpdateInput {
  name?: string;
  type?: WaypointType;
  point?: PointUpdateOneRequiredWithoutRelationInput;
  audiotrack?: AudiotrackUpdateOneInput;
  letter?: string;
  chapter?: string;
  image?: File;
  video?: File;
  position?: number;
}

export interface WaypointUpdateManyWithWhereNestedInput {
  where: WaypointWhereInput;
  data: WaypointUpdateManyDataInput;
}

export interface WaypointUpdateManyDataInput {
  name?: string;
  type?: WaypointType;
  letter?: string;
  chapter?: string;
  image?: File;
  video?: File;
  position?: number;
}

export interface WaypointCreateInput {
  name?: string;
  type: WaypointType;
  point: PointCreateOneWithoutRelationInput;
  audiotrack?: AudiotrackCreateOneInput;
  letter?: string;
  chapter?: string;
  image?: File;
  video?: File;
  track: TrackCreateOneInput;
  position?: number;
}

export interface TrackCreateOneInput {
  connect?: TrackWhereUniqueInput;
}

export interface WaypointUpdateManyInput {
  id: string;
  name?: string;
  type?: WaypointType;
  point?: PointUpdateOneRequiredWithoutRelationInput;
  letter?: string;
  chapter?: string;
  position?: number;
}

export interface BatchPayload {
  count: number;
}

export interface AdminCreateInput {
  email: string;
  username: string;
  password: string;
}

export interface AdminUpdateInput {
  email?: string;
  username?: string;
  password?: string;
}

export interface AdminUserUpdateInput {
  email?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  birthdate?: string;
  phone?: string;
  city?: string;
  country?: CountryUpdateOneInput;
  locale?: Locale;
  role?: Role;
  status?: UserStatus;
  terms?: boolean;
  enableNotifications?: boolean;
  enableSounds?: boolean;
  enableVibrations?: boolean;
  funfactPlayMode?: FunfactPlayMode;
}

export interface CountryUpdateOneInput {
  create?: CountryCreateInput;
  update?: CountryUpdateInput;
  upsert?: CountryUpsertNestedInput;
  delete?: boolean;
  disconnect?: boolean;
  connect?: CountryWhereUniqueInput;
}

export interface ListenedFunfact {
  id: string;
  user: User;
  funfact: Funfact;
  stopTime?: number;
  listeningsCount: number;
  status: ItemStatus;
  stoppedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StartedTrack {
  id: string;
  user: User;
  track: Track;
  nextWaypoint: Waypoint;
  status: ItemStatus;
  startedCount: number;
  stoppedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Remark {
  id: string;
  author: User;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CountrySubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: CountryWhereInput;
  AND?: CountrySubscriptionWhereInput[];
  OR?: CountrySubscriptionWhereInput[];
  NOT?: CountrySubscriptionWhereInput[];
}

export interface CitySubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: CityWhereInput;
  AND?: CitySubscriptionWhereInput[];
  OR?: CitySubscriptionWhereInput[];
  NOT?: CitySubscriptionWhereInput[];
}

export interface UserCreateOneWithoutCommentsInput {
  connect?: UserWhereUniqueInput;
}

export interface UserCreateOneWithoutFavoritesInput {
  connect?: UserWhereUniqueInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[];
  OR?: UserSubscriptionWhereInput[];
  NOT?: UserSubscriptionWhereInput[];
}

export interface UserWhereInput {
  id?: string;
  id_in?: string[];
  id_not_in?: string[];
  email?: string;
  email_not?: string;
  email_in?: string[];
  email_not_in?: string[];
  email_contains?: string;
  email_starts_with?: string;
  email_ends_with?: string;
  firstname?: string;
  firstname_contains?: string;
  firstname_not_contains?: string;
  firstname_starts_with?: string;
  firstname_not_starts_with?: string;
  firstname_ends_with?: string;
  firstname_not_ends_with?: string;
  lastname?: string;
  lastname_not?: string;
  lastname_contains?: string;
  lastname_not_contains?: string;
  lastname_starts_with?: string;
  lastname_not_starts_with?: string;
  lastname_ends_with?: string;
  lastname_not_ends_with?: string;
  gender?: Gender;
  gender_not?: Gender;
  gender_in?: Gender[];
  gender_not_in?: Gender[];
  birthdate?: Date;
  birthdate_not?: Date;
  birthdate_lt?: Date;
  birthdate_lte?: Date;
  birthdate_gt?: Date;
  birthdate_gte?: Date;
  phone?: string;
  phone_not?: string;
  phone_in?: string[];
  phone_not_in?: string[];
  phone_contains?: string;
  phone_not_contains?: string;
  phone_starts_with?: string;
  phone_not_starts_with?: string;
  phone_ends_with?: string;
  phone_not_ends_with?: string;
  city?: CityWhereInput;
  country?: CountryWhereInput;
  locale?: Locale;
  locale_not?: Locale;
  locale_in?: Locale[];
  locale_not_in?: Locale[];
  status?: UserStatus;
  status_not?: UserStatus;
  status_in?: UserStatus[];
  status_not_in?: UserStatus[];
  terms?: boolean;
  terms_not?: boolean;
  favorites_every?: FavoriteWhereInput;
  favorites_some?: FavoriteWhereInput;
  favorites_none?: FavoriteWhereInput;
  comments_every?: CommentWhereInput;
  comments_some?: CommentWhereInput;
  comments_none?: CommentWhereInput;
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput[];
}

export interface FavoriteWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  user?: UserWhereInput;
  comment?: string;
  comment_not?: string;
  comment_in?: string[];
  comment_not_in?: string[];
  comment_lt?: string;
  comment_lte?: string;
  comment_gt?: string;
  comment_gte?: string;
  comment_contains?: string;
  comment_not_contains?: string;
  comment_starts_with?: string;
  comment_not_starts_with?: string;
  comment_ends_with?: string;
  comment_not_ends_with?: string;
  track?: TrackWhereInput;
  funfact?: FunfactWhereInput;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: FavoriteWhereInput[];
  OR?: FavoriteWhereInput[];
  NOT?: FavoriteWhereInput[];
}

export interface SignupInput {
  gender: Gender;
  firstname: string;
  lastname: string;
  birthdate: Date;
  city: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

export interface SigninFacebookInput {
  accessToken: string;
}

export interface SignupFacebookInput {
  accessToken: string;
  gender: Gender;
  firstname: string;
  lastname: string;
  birthdate: Date;
  city: string;
  country: string;
  phone: string;
  email: string;
  terms: boolean;
}

export interface UserUpdatePasswordInput {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserUpdateInput {
  email?: string;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  birthdate?: string;
  phone?: string;
  city?: string;
  country?: string;
  locale?: Locale;
  terms?: boolean;
  enableNotifications?: boolean;
  enableSounds?: boolean;
  enableVibrations?: boolean;
  funfactPlayMode?: FunfactPlayMode;
}

export interface UserForgetPasswordInput {
  email: string;
}

export interface UserCheckEmailInput {
  email: string;
}

export interface FunfactCreateOneWithoutFavoritesInput {
  connect?: FunfactWhereUniqueInput;
}

export interface ListenedFunfactUpdateInput {
  stopTime?: number;
}

export interface ListenedFunfactWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  user?: UserWhereInput;
  funfact?: FunfactWhereInput;
  status?: ItemStatus;
  stoppedAt?: Date;
  stoppedAt_not?: Date;
  stoppedAt_in?: Date[];
  stoppedAt_not_in?: Date[];
  stoppedAt_lt?: Date;
  stoppedAt_lte?: Date;
  stoppedAt_gt?: Date;
  stoppedAt_gte?: Date;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: ListenedFunfactWhereInput[];
  OR?: ListenedFunfactWhereInput[];
  NOT?: ListenedFunfactWhereInput[];
}

export interface ListenedFunfactWhereUniqueInput {
  id?: string;
}

export interface MediaWhereInput {
  id?: string;
  type?: MediaType;
  type_not?: MediaType;
  type_in?: MediaType[];
  type_not_in?: MediaType[];
  isTeaser?: boolean;
  AND?: MediaWhereInput[];
  OR?: MediaWhereInput[];
  NOT?: MediaWhereInput[];
}

export interface MediaWhereUniqueInput {
  id: string;
}

export interface CommentCreateInput {
  track: TrackCreateOneWithoutCommentsInput;
  content?: string;
  score: number;
}

export interface TrackCreateOneWithoutCommentsInput {
  connect?: TrackWhereUniqueInput;
}

export interface CommentScalarWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  content?: string;
  content_not?: string;
  content_in?: string[];
  content_not_in?: string[];
  content_lt?: string;
  content_lte?: string;
  content_gt?: string;
  content_gte?: string;
  content_contains?: string;
  content_not_contains?: string;
  content_starts_with?: string;
  content_not_starts_with?: string;
  content_ends_with?: string;
  content_not_ends_with?: string;
  score?: number;
  score_not?: number;
  score_in?: number[];
  score_not_in?: number[];
  score_lt?: number;
  score_lte?: number;
  score_gt?: number;
  score_gte?: number;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: CommentScalarWhereInput[];
  OR?: CommentScalarWhereInput[];
  NOT?: CommentScalarWhereInput[];
}

export interface CommentSubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: CommentWhereInput;
  AND?: CommentSubscriptionWhereInput[];
  OR?: CommentSubscriptionWhereInput[];
  NOT?: CommentSubscriptionWhereInput[];
}

export interface RemarkCreateInput {
  content?: string;
}

export interface RemarkWhereInput {
  id?: string;
  author?: UserWhereUniqueInput;
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: RemarkWhereInput[];
  OR?: RemarkWhereInput[];
  NOT?: RemarkWhereInput[];
}

export interface RemarkWhereUniqueInput {
  id: string;
}

export interface FavoriteCreateInput {
  comment?: string;
  track?: TrackCreateOneWithoutFavoritesInput;
  funfact?: FunfactCreateOneWithoutFavoritesInput;
}

export interface TrackCreateOneWithoutFavoritesInput {
  connect?: TrackWhereUniqueInput;
}

export interface FavoriteScalarWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  comment?: string;
  comment_not?: string;
  comment_in?: string[];
  comment_not_in?: string[];
  comment_lt?: string;
  comment_lte?: string;
  comment_gt?: string;
  comment_gte?: string;
  comment_contains?: string;
  comment_not_contains?: string;
  comment_starts_with?: string;
  comment_not_starts_with?: string;
  comment_ends_with?: string;
  comment_not_ends_with?: string;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: FavoriteScalarWhereInput[];
  OR?: FavoriteScalarWhereInput[];
  NOT?: FavoriteScalarWhereInput[];
}

export interface FavoriteSubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: FavoriteWhereInput;
  AND?: FavoriteSubscriptionWhereInput[];
  OR?: FavoriteSubscriptionWhereInput[];
  NOT?: FavoriteSubscriptionWhereInput[];
}

export interface FavoriteUpdateInput {
  comment?: string;
}

export interface FavoriteUpdateManyDataInput {
  comment?: string;
}

export interface FavoriteUpdateManyMutationInput {
  comment?: string;
}

export interface FavoriteWhereUniqueInput {
  id: string;
}

export interface PointWhereUniqueInput {
  id: string;
}

export interface WaypointCreateOneInput {
  connect?: WaypointWhereUniqueInput;
}

export interface WaypointScalarWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  type?: WaypointType;
  type_not?: WaypointType;
  type_in?: WaypointType[];
  type_not_in?: WaypointType[];
  letter?: string;
  letter_not?: string;
  letter_in?: string[];
  letter_not_in?: string[];
  letter_lt?: string;
  letter_lte?: string;
  letter_gt?: string;
  letter_gte?: string;
  letter_contains?: string;
  letter_not_contains?: string;
  letter_starts_with?: string;
  letter_not_starts_with?: string;
  letter_ends_with?: string;
  letter_not_ends_with?: string;
  chapter?: string;
  chapter_not?: string;
  chapter_in?: string[];
  chapter_not_in?: string[];
  chapter_lt?: string;
  chapter_lte?: string;
  chapter_gt?: string;
  chapter_gte?: string;
  chapter_contains?: string;
  chapter_not_contains?: string;
  chapter_starts_with?: string;
  chapter_not_starts_with?: string;
  chapter_ends_with?: string;
  chapter_not_ends_with?: string;
  image?: string;
  image_not?: string;
  image_in?: string[];
  image_not_in?: string[];
  image_lt?: string;
  image_lte?: string;
  image_gt?: string;
  image_gte?: string;
  image_contains?: string;
  image_not_contains?: string;
  image_starts_with?: string;
  image_not_starts_with?: string;
  image_ends_with?: string;
  image_not_ends_with?: string;
  video?: string;
  video_not?: string;
  video_in?: string[];
  video_not_in?: string[];
  video_lt?: string;
  video_lte?: string;
  video_gt?: string;
  video_gte?: string;
  video_contains?: string;
  video_not_contains?: string;
  video_starts_with?: string;
  video_not_starts_with?: string;
  video_ends_with?: string;
  video_not_ends_with?: string;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: WaypointScalarWhereInput[];
  OR?: WaypointScalarWhereInput[];
  NOT?: WaypointScalarWhereInput[];
}

export interface WaypointSubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: WaypointWhereInput;
  AND?: WaypointSubscriptionWhereInput[];
  OR?: WaypointSubscriptionWhereInput[];
  NOT?: WaypointSubscriptionWhereInput[];
}

export interface TrackSubscriptionWhereInput {
  mutation_in?: MutationType[];
  updatedFields_contains?: string;
  updatedFields_contains_every?: string[];
  updatedFields_contains_some?: string[];
  node?: TrackWhereInput;
  AND?: TrackSubscriptionWhereInput[];
  OR?: TrackSubscriptionWhereInput[];
  NOT?: TrackSubscriptionWhereInput[];
}

export interface StartedTrackUpdateInput {
  nextWaypoint?: WaypointCreateOneInput;
}

export interface StartedTrackWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  user?: UserWhereInput;
  track?: TrackWhereInput;
  stopped?: boolean;
  stopped_not?: boolean;
  nextWaypoint?: WaypointWhereInput;
  finished?: boolean;
  finished_not?: boolean;
  status?: ItemStatus;
  stoppedAt?: Date;
  stoppedAt_not?: Date;
  stoppedAt_in?: Date[];
  stoppedAt_not_in?: Date[];
  stoppedAt_lt?: Date;
  stoppedAt_lte?: Date;
  stoppedAt_gt?: Date;
  stoppedAt_gte?: Date;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: StartedTrackWhereInput[];
  OR?: StartedTrackWhereInput[];
  NOT?: StartedTrackWhereInput[];
}

export interface StartedTrackWhereUniqueInput {
  id?: string;
}

export interface UserCustomInput {
  connect?: UserWhereUniqueInput;
}

export interface TrackCustomInput {
  connect?: TrackWhereUniqueInput;
}

export interface FunfactCustomInput {
  connect?: FunfactWhereUniqueInput;
}

export interface PurchaseCustomCreateInput {
  paymentType?: MobilePlatform;
  purchaseType?: PurchaseType;
  track?: TrackCustomInput;
  funfact?: FunfactCustomInput;
}

export interface PurchaseLinkInput {
  track?: TrackWhereUniqueInput;
  funfact?: FunfactWhereUniqueInput;
}

export interface PurchaseWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  token?: string;
  token_not?: string;
  token_in?: string[];
  token_not_in?: string[];
  token_lt?: string;
  token_lte?: string;
  token_gt?: string;
  token_gte?: string;
  token_contains?: string;
  token_not_contains?: string;
  token_starts_with?: string;
  token_not_starts_with?: string;
  token_ends_with?: string;
  token_not_ends_with?: string;
  user?: UserWhereInput;
  status?: PaymentStatus;
  status_not?: PaymentStatus;
  status_in?: PaymentStatus[];
  status_not_in?: PaymentStatus[];
  paymentType?: MobilePlatform;
  paymentType_not?: MobilePlatform;
  paymentType_in?: MobilePlatform[];
  paymentType_not_in?: MobilePlatform[];
  purchaseType?: PurchaseType;
  purchaseType_not?: PurchaseType;
  purchaseType_in?: PurchaseType[];
  purchaseType_not_in?: PurchaseType[];
  track?: TrackWhereInput;
  funfact?: FunfactWhereInput;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: PurchaseWhereInput[];
  OR?: PurchaseWhereInput[];
  NOT?: PurchaseWhereInput[];
}

export interface PurchaseWhereUniqueInput {
  id: string;
}

export interface AbonnementCustomCreateInput {
  status?: PaymentStatus;
}

export interface AbonnementCustomUpdateInput {
  status?: PaymentStatus;
}

export interface AbonnementWhereInput {
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
  token?: string;
  token_not?: string;
  token_in?: string[];
  token_not_in?: string[];
  token_lt?: string;
  token_lte?: string;
  token_gt?: string;
  token_gte?: string;
  token_contains?: string;
  token_not_contains?: string;
  token_starts_with?: string;
  token_not_starts_with?: string;
  token_ends_with?: string;
  token_not_ends_with?: string;
  user?: UserWhereInput;
  status?: PaymentStatus;
  status_not?: PaymentStatus;
  status_in?: PaymentStatus[];
  status_not_in?: PaymentStatus[];
  paymentType?: MobilePlatform;
  paymentType_not?: MobilePlatform;
  paymentType_in?: MobilePlatform[];
  paymentType_not_in?: MobilePlatform[];
  expiresAt?: Date;
  expiresAt_not?: Date;
  expiresAt_in?: Date[];
  expiresAt_not_in?: Date[];
  expiresAt_lt?: Date;
  expiresAt_lte?: Date;
  expiresAt_gt?: Date;
  expiresAt_gte?: Date;
  createdAt?: Date;
  createdAt_not?: Date;
  createdAt_in?: Date[];
  createdAt_not_in?: Date[];
  createdAt_lt?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  createdAt_gte?: Date;
  updatedAt?: Date;
  updatedAt_not?: Date;
  updatedAt_in?: Date[];
  updatedAt_not_in?: Date[];
  updatedAt_lt?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
  updatedAt_gte?: Date;
  AND?: AbonnementWhereInput[];
  OR?: AbonnementWhereInput[];
  NOT?: AbonnementWhereInput[];
}

export interface AbonnementWhereUniqueInput {
  id: string;
}

export interface FavoriteConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: FavoriteEdge[];
}

export interface FavoriteEdge {
  node: Favorite;
  cursor: string;
}

export interface StartedTrackConnection {
  pageInfo: PageInfo;
  edges: StartedTrackEdge[];
  aggregate: Aggregate;
}

export interface StartedTrackEdge {
  node: StartedTrack;
  cursor: string;
}

export interface ListenedFunfactConnection {
  pageInfo: PageInfo;
  edges: ListenedFunfactEdge[];
  aggregate: Aggregate;
}

export interface ListenedFunfactEdge {
  node: ListenedFunfact;
  cursor: string;
}

export interface WaypointConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: WaypointEdge[];
}

export interface WaypointEdge {
  node: Waypoint;
  cursor: string;
}

export interface PointConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: PointEdge[];
}

export interface PointEdge {
  node: Point;
  cursor: string;
}

export interface RemarkConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: RemarkEdge[];
}

export interface RemarkEdge {
  node: Remark;
  cursor: string;
}

export interface PurchaseConnection {
  pageInfo: PageInfo;
  aggregate: Aggregate;
  edges?: PurchaseEdge[];
}

export interface PurchaseEdge {
  node: Purchase;
  cursor: string;
}

export interface CityUpsertNestedInput {
  update: CityUpdateInput;
  create: CityCreateInput;
}

export interface CityUpdateOneInput {
  create?: CityCreateInput;
  update?: CityUpdateInput;
  upsert?: CityUpsertNestedInput;
  delete?: boolean;
  disconnect?: boolean;
  connect?: CityWhereUniqueInput;
}

export interface AudiotrackUpsertNestedInput {
  update: AudiotrackUpdateInput;
  create: AudiotrackCreateInput;
}

export type AudiotrackOrderByInput =
  | 'code_ASC'
  | 'code_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'duration_ASC'
  | 'duration_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type CommentOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'content_ASC'
  | 'content_DESC'
  | 'score_ASC'
  | 'score_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Locale = 'FR' | 'EN';

export type UserStatus = 'PENDING' | 'ACTIVE' | 'DELETED';

export type FunfactPlayMode = 'AUTO' | 'SEMIAUTO' | 'MANUAL';

export type ToggleStatus = 'OFFLINE' | 'ONLINE';

export type PersonType = 'GUIDE' | 'VOICE' | 'WRITER';

export type WaypointType = 'FIXED' | 'MOBILE' | 'GARDEN' | 'INVISIBLE';

export type WaypointDirection =
  | 'STRAIGHT'
  | 'SLIGHT_LEFT'
  | 'LEFT'
  | 'SHARP_LEFT'
  | 'SLIGHT_RIGHT'
  | 'RIGHT'
  | 'SHARP_RIGHT'
  | 'UTURN';

export type MediaType = 'IMAGE' | 'VIDEO';

export type PaymentStatus = 'APPROVED' | 'PENDING' | 'FAILED' | 'EXPIRED' | 'REFUND';

export type PurchaseType = 'FUNFACT' | 'TRACK';

export type MobilePlatform = 'IOS' | 'ANDROID';

export type FunfactOrderByInput =
  | 'name_ASC'
  | 'name_DESC'
  | 'price_ASC'
  | 'price_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type SnippetOrderByInput =
  | 'code_ASC'
  | 'code_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type CurrencyOrderByInput =
  | 'code_ASC'
  | 'code_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'symbol_ASC'
  | 'symbol_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type CountryOrderByInput =
  | 'name_ASC'
  | 'name_DESC'
  | 'code_ASC'
  | 'code_DESC'
  | 'alpha2_ASC'
  | 'alpha2_DESC'
  | 'alpha3_ASC'
  | 'alpha3_DESC'
  | 'officialNameEn_ASC'
  | 'officialNameEn_DESC'
  | 'officialNameFr_ASC'
  | 'officialNameFr_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type CityOrderByInput =
  | 'name_ASC'
  | 'name_DESC'
  | 'code_ASC'
  | 'code_DESC'
  | 'officialNameEn_ASC'
  | 'officialNameEn_DESC'
  | 'officialNameFr_ASC'
  | 'officialNameFr_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type CategoryOrderByInput =
  | 'code_ASC'
  | 'code_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type PersonOrderByInput =
  | 'type_ASC'
  | 'type_DESC'
  | 'firstname_ASC'
  | 'firstname_DESC'
  | 'lastname_ASC'
  | 'lastname_DESC'
  | 'avatar_ASC'
  | 'avatar_DESC'
  | 'video_ASC'
  | 'video_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'content_ASC'
  | 'content_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type TrackOrderByInput =
  | 'name_ASC'
  | 'name_DESC'
  | 'price_ASC'
  | 'price_DESC'
  | 'duration_ASC'
  | 'duration_DESC'
  | 'length_ASC'
  | 'length_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type WaypointOrderByInput =
  | 'type_ASC'
  | 'type_DESC'
  | 'letter_ASC'
  | 'letter_DESC'
  | 'chapter_ASC'
  | 'chapter_DESC'
  | 'position_ASC'
  | 'position_DESC';

export type AdminOrderByInput =
  | 'email_ASC'
  | 'email_DESC'
  | 'username_ASC'
  | 'username_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type Role = 'USER' | 'MEMBER' | 'ADMIN';

export type UserOrderByInput =
  | 'email_ASC'
  | 'email_DESC'
  | 'username_ASC'
  | 'username_DESC'
  | 'firstname_ASC'
  | 'firstname_DESC'
  | 'lastname_ASC'
  | 'lastname_DESC'
  | 'gender_ASC'
  | 'gender_DESC'
  | 'birthdate_ASC'
  | 'birthdate_DESC'
  | 'locale_ASC'
  | 'locale_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type ItemStatus = 'STARTED' | 'PAUSED' | 'COMPLETED';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type FavoriteOrderByInput =
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type StartedTrackOrderByInput =
  | 'stoppedAt_ASC'
  | 'stoppedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type ListenedFunfactOrderByInput =
  | 'stoppedAt_ASC'
  | 'stoppedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type PointOrderByInput = 'letter_ASC' | 'letter_DESC' | 'chapter_ASC' | 'chapter_DESC';

export type RemarkOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'content_ASC'
  | 'content_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type PurchaseOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export type AbonnementOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'abonnementType_ASC'
  | 'abonnementType_DESC'
  | 'expiresAt_ASC'
  | 'expiresAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';
