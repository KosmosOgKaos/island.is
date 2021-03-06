import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { Context } from './context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  StringTrimmed: any
}

export type AuthUser = {
  __typename?: 'AuthUser'
  ssn: Scalars['String']
  name: Scalars['String']
  mobile?: Maybe<Scalars['String']>
  role: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  companies?: Maybe<Array<Maybe<Company>>>
  company?: Maybe<Company>
  companyApplication?: Maybe<CompanyApplication>
  companyApplications?: Maybe<Array<Maybe<CompanyApplication>>>
  giftCardCode?: Maybe<GiftCardCode>
  giftCards?: Maybe<Array<Maybe<GiftCard>>>
  root?: Maybe<Scalars['String']>
  user?: Maybe<AuthUser>
  userApplication?: Maybe<UserApplication>
  userApplicationCount?: Maybe<Scalars['Int']>
}

export type QueryCompanyArgs = {
  ssn: Scalars['String']
}

export type QueryCompanyApplicationArgs = {
  id: Scalars['String']
}

export type QueryGiftCardCodeArgs = {
  giftCardId: Scalars['Int']
}

export type Company = {
  __typename?: 'Company'
  ssn: Scalars['String']
  name: Scalars['String']
  application?: Maybe<CompanyApplication>
}

export type ApplicationLog = {
  __typename?: 'ApplicationLog'
  id: Scalars['String']
  created?: Maybe<Scalars['String']>
  state: Scalars['String']
  title: Scalars['String']
  data?: Maybe<Scalars['String']>
  authorSSN?: Maybe<Scalars['String']>
}

export type CompanyApplication = {
  __typename?: 'CompanyApplication'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  state: Scalars['String']
  companySSN: Scalars['String']
  serviceCategory?: Maybe<Scalars['String']>
  generalEmail?: Maybe<Scalars['String']>
  companyDisplayName?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  exhibition?: Maybe<Scalars['Boolean']>
  operatingPermitForRestaurant?: Maybe<Scalars['Boolean']>
  operatingPermitForVehicles?: Maybe<Scalars['Boolean']>
  operationsTrouble?: Maybe<Scalars['Boolean']>
  phoneNumber?: Maybe<Scalars['String']>
  validLicenses?: Maybe<Scalars['Boolean']>
  validPermit?: Maybe<Scalars['Boolean']>
  webpage?: Maybe<Scalars['String']>
  publicHelpAmount?: Maybe<Scalars['Int']>
  logs?: Maybe<Array<Maybe<ApplicationLog>>>
}

export type CreateCompanyApplicationInput = {
  email: Scalars['StringTrimmed']
  generalEmail: Scalars['StringTrimmed']
  phoneNumber: Scalars['StringTrimmed']
  operationsTrouble: Scalars['Boolean']
  companySSN: Scalars['StringTrimmed']
  name: Scalars['StringTrimmed']
  serviceCategory: Scalars['StringTrimmed']
  webpage: Scalars['StringTrimmed']
  companyName: Scalars['StringTrimmed']
  companyDisplayName: Scalars['StringTrimmed']
  operatingPermitForRestaurant: Scalars['Boolean']
  exhibition: Scalars['Boolean']
  operatingPermitForVehicles: Scalars['Boolean']
  validLicenses: Scalars['Boolean']
  validPermit: Scalars['Boolean']
  publicHelpAmount: Scalars['Int']
}

export type ApproveCompanyApplicationInput = {
  id: Scalars['String']
}

export type RejectCompanyApplicationInput = {
  id: Scalars['String']
}

export type UpdateCompanyApplicationInput = {
  id: Scalars['String']
  webpage?: Maybe<Scalars['String']>
  generalEmail?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type CreateCompanyApplication = {
  __typename?: 'CreateCompanyApplication'
  application?: Maybe<CompanyApplication>
}

export type ApproveCompanyApplication = {
  __typename?: 'ApproveCompanyApplication'
  application?: Maybe<CompanyApplication>
}

export type RejectCompanyApplication = {
  __typename?: 'RejectCompanyApplication'
  application?: Maybe<CompanyApplication>
}

export type UpdateCompanyApplication = {
  __typename?: 'UpdateCompanyApplication'
  application?: Maybe<CompanyApplication>
}

export type Mutation = {
  __typename?: 'Mutation'
  approveCompanyApplication?: Maybe<ApproveCompanyApplication>
  confirmMobile?: Maybe<ConfirmMobile>
  createCompanyApplication?: Maybe<CreateCompanyApplication>
  createUserApplication?: Maybe<CreateUserApplication>
  fetchUserApplication?: Maybe<UserApplication>
  giveGift?: Maybe<GiveGift>
  rejectCompanyApplication?: Maybe<RejectCompanyApplication>
  root?: Maybe<Scalars['String']>
  updateCompanyApplication?: Maybe<UpdateCompanyApplication>
  verifyUserApplication?: Maybe<VerifyUserApplication>
}

export type MutationApproveCompanyApplicationArgs = {
  input: ApproveCompanyApplicationInput
}

export type MutationConfirmMobileArgs = {
  input?: Maybe<ConfirmMobileInput>
}

export type MutationCreateCompanyApplicationArgs = {
  input: CreateCompanyApplicationInput
}

export type MutationCreateUserApplicationArgs = {
  input?: Maybe<CreateUserApplicationInput>
}

export type MutationFetchUserApplicationArgs = {
  ssn: Scalars['String']
}

export type MutationGiveGiftArgs = {
  input?: Maybe<GiveGiftInput>
}

export type MutationRejectCompanyApplicationArgs = {
  input: RejectCompanyApplicationInput
}

export type MutationUpdateCompanyApplicationArgs = {
  input: UpdateCompanyApplicationInput
}

export type MutationVerifyUserApplicationArgs = {
  input?: Maybe<VerifyUserApplicationInput>
}

export type Greeting = {
  __typename?: 'Greeting'
  greetingType?: Maybe<Scalars['Int']>
  text?: Maybe<Scalars['String']>
  contentUrl?: Maybe<Scalars['String']>
}

export type GiftDetail = {
  __typename?: 'GiftDetail'
  packageId: Scalars['String']
  from?: Maybe<Scalars['String']>
  greeting?: Maybe<Greeting>
  personalMessage?: Maybe<Scalars['String']>
}

export type GiftCard = {
  __typename?: 'GiftCard'
  giftCardId: Scalars['Int']
  amount: Scalars['Float']
  applicationId?: Maybe<Scalars['String']>
  giftDetail?: Maybe<GiftDetail>
}

export type GiftCardCode = {
  __typename?: 'GiftCardCode'
  code: Scalars['String']
  expiryDate: Scalars['String']
  pollingUrl: Scalars['String']
}

export type UserApplication = {
  __typename?: 'UserApplication'
  id: Scalars['String']
  mobileNumber: Scalars['String']
  countryCode: Scalars['String']
  verified: Scalars['Boolean']
  logs?: Maybe<Array<Maybe<ApplicationLog>>>
}

export type GiveGift = {
  __typename?: 'GiveGift'
  success: Scalars['Boolean']
}

export type CreateUserApplication = {
  __typename?: 'CreateUserApplication'
  application?: Maybe<UserApplication>
}

export type CreateUserApplicationInput = {
  mobile?: Maybe<Scalars['StringTrimmed']>
  confirmCode?: Maybe<Scalars['StringTrimmed']>
}

export type VerifyUserApplication = {
  __typename?: 'VerifyUserApplication'
  application?: Maybe<UserApplication>
}

export type VerifyUserApplicationInput = {
  mobile?: Maybe<Scalars['StringTrimmed']>
  confirmCode?: Maybe<Scalars['StringTrimmed']>
}

export type ConfirmMobile = {
  __typename?: 'ConfirmMobile'
  mobile: Scalars['String']
  success: Scalars['Boolean']
}

export type ConfirmMobileInput = {
  mobile?: Maybe<Scalars['StringTrimmed']>
}

export type GiveGiftInput = {
  giftCardId: Scalars['Int']
  recipientMobileNumber: Scalars['StringTrimmed']
  message?: Maybe<Scalars['String']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthUser: ResolverTypeWrapper<AuthUser>
  String: ResolverTypeWrapper<Scalars['String']>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  StringTrimmed: ResolverTypeWrapper<Scalars['StringTrimmed']>
  Company: ResolverTypeWrapper<Company>
  ApplicationLog: ResolverTypeWrapper<ApplicationLog>
  CompanyApplication: ResolverTypeWrapper<CompanyApplication>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CreateCompanyApplicationInput: CreateCompanyApplicationInput
  ApproveCompanyApplicationInput: ApproveCompanyApplicationInput
  RejectCompanyApplicationInput: RejectCompanyApplicationInput
  UpdateCompanyApplicationInput: UpdateCompanyApplicationInput
  CreateCompanyApplication: ResolverTypeWrapper<CreateCompanyApplication>
  ApproveCompanyApplication: ResolverTypeWrapper<ApproveCompanyApplication>
  RejectCompanyApplication: ResolverTypeWrapper<RejectCompanyApplication>
  UpdateCompanyApplication: ResolverTypeWrapper<UpdateCompanyApplication>
  Mutation: ResolverTypeWrapper<{}>
  Greeting: ResolverTypeWrapper<Greeting>
  GiftDetail: ResolverTypeWrapper<GiftDetail>
  GiftCard: ResolverTypeWrapper<GiftCard>
  Float: ResolverTypeWrapper<Scalars['Float']>
  GiftCardCode: ResolverTypeWrapper<GiftCardCode>
  UserApplication: ResolverTypeWrapper<UserApplication>
  GiveGift: ResolverTypeWrapper<GiveGift>
  CreateUserApplication: ResolverTypeWrapper<CreateUserApplication>
  CreateUserApplicationInput: CreateUserApplicationInput
  VerifyUserApplication: ResolverTypeWrapper<VerifyUserApplication>
  VerifyUserApplicationInput: VerifyUserApplicationInput
  ConfirmMobile: ResolverTypeWrapper<ConfirmMobile>
  ConfirmMobileInput: ConfirmMobileInput
  GiveGiftInput: GiveGiftInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthUser: AuthUser
  String: Scalars['String']
  Query: {}
  Int: Scalars['Int']
  StringTrimmed: Scalars['StringTrimmed']
  Company: Company
  ApplicationLog: ApplicationLog
  CompanyApplication: CompanyApplication
  Boolean: Scalars['Boolean']
  CreateCompanyApplicationInput: CreateCompanyApplicationInput
  ApproveCompanyApplicationInput: ApproveCompanyApplicationInput
  RejectCompanyApplicationInput: RejectCompanyApplicationInput
  UpdateCompanyApplicationInput: UpdateCompanyApplicationInput
  CreateCompanyApplication: CreateCompanyApplication
  ApproveCompanyApplication: ApproveCompanyApplication
  RejectCompanyApplication: RejectCompanyApplication
  UpdateCompanyApplication: UpdateCompanyApplication
  Mutation: {}
  Greeting: Greeting
  GiftDetail: GiftDetail
  GiftCard: GiftCard
  Float: Scalars['Float']
  GiftCardCode: GiftCardCode
  UserApplication: UserApplication
  GiveGift: GiveGift
  CreateUserApplication: CreateUserApplication
  CreateUserApplicationInput: CreateUserApplicationInput
  VerifyUserApplication: VerifyUserApplication
  VerifyUserApplicationInput: VerifyUserApplicationInput
  ConfirmMobile: ConfirmMobile
  ConfirmMobileInput: ConfirmMobileInput
  GiveGiftInput: GiveGiftInput
}

export type AuthUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']
> = {
  ssn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  companies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Company']>>>,
    ParentType,
    ContextType
  >
  company?: Resolver<
    Maybe<ResolversTypes['Company']>,
    ParentType,
    ContextType,
    RequireFields<QueryCompanyArgs, 'ssn'>
  >
  companyApplication?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType,
    RequireFields<QueryCompanyApplicationArgs, 'id'>
  >
  companyApplications?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CompanyApplication']>>>,
    ParentType,
    ContextType
  >
  giftCardCode?: Resolver<
    Maybe<ResolversTypes['GiftCardCode']>,
    ParentType,
    ContextType,
    RequireFields<QueryGiftCardCodeArgs, 'giftCardId'>
  >
  giftCards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GiftCard']>>>,
    ParentType,
    ContextType
  >
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType>
  userApplication?: Resolver<
    Maybe<ResolversTypes['UserApplication']>,
    ParentType,
    ContextType
  >
  userApplicationCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
}

export interface StringTrimmedScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['StringTrimmed'], any> {
  name: 'StringTrimmed'
}

export type CompanyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']
> = {
  ssn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  application?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ApplicationLogResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ApplicationLog'] = ResolversParentTypes['ApplicationLog']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  authorSSN?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type CompanyApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CompanyApplication'] = ResolversParentTypes['CompanyApplication']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  companySSN?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  serviceCategory?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  generalEmail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  companyDisplayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  companyName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  exhibition?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  operatingPermitForRestaurant?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  operatingPermitForVehicles?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  operationsTrouble?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  phoneNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  validLicenses?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  validPermit?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  webpage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  publicHelpAmount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  logs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ApplicationLog']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type CreateCompanyApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateCompanyApplication'] = ResolversParentTypes['CreateCompanyApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ApproveCompanyApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ApproveCompanyApplication'] = ResolversParentTypes['ApproveCompanyApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type RejectCompanyApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RejectCompanyApplication'] = ResolversParentTypes['RejectCompanyApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UpdateCompanyApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UpdateCompanyApplication'] = ResolversParentTypes['UpdateCompanyApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['CompanyApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  approveCompanyApplication?: Resolver<
    Maybe<ResolversTypes['ApproveCompanyApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationApproveCompanyApplicationArgs, 'input'>
  >
  confirmMobile?: Resolver<
    Maybe<ResolversTypes['ConfirmMobile']>,
    ParentType,
    ContextType,
    RequireFields<MutationConfirmMobileArgs, never>
  >
  createCompanyApplication?: Resolver<
    Maybe<ResolversTypes['CreateCompanyApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCompanyApplicationArgs, 'input'>
  >
  createUserApplication?: Resolver<
    Maybe<ResolversTypes['CreateUserApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserApplicationArgs, never>
  >
  fetchUserApplication?: Resolver<
    Maybe<ResolversTypes['UserApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationFetchUserApplicationArgs, 'ssn'>
  >
  giveGift?: Resolver<
    Maybe<ResolversTypes['GiveGift']>,
    ParentType,
    ContextType,
    RequireFields<MutationGiveGiftArgs, never>
  >
  rejectCompanyApplication?: Resolver<
    Maybe<ResolversTypes['RejectCompanyApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationRejectCompanyApplicationArgs, 'input'>
  >
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updateCompanyApplication?: Resolver<
    Maybe<ResolversTypes['UpdateCompanyApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCompanyApplicationArgs, 'input'>
  >
  verifyUserApplication?: Resolver<
    Maybe<ResolversTypes['VerifyUserApplication']>,
    ParentType,
    ContextType,
    RequireFields<MutationVerifyUserApplicationArgs, never>
  >
}

export type GreetingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Greeting'] = ResolversParentTypes['Greeting']
> = {
  greetingType?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  contentUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type GiftDetailResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GiftDetail'] = ResolversParentTypes['GiftDetail']
> = {
  packageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  greeting?: Resolver<
    Maybe<ResolversTypes['Greeting']>,
    ParentType,
    ContextType
  >
  personalMessage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type GiftCardResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GiftCard'] = ResolversParentTypes['GiftCard']
> = {
  giftCardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  applicationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  giftDetail?: Resolver<
    Maybe<ResolversTypes['GiftDetail']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type GiftCardCodeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GiftCardCode'] = ResolversParentTypes['GiftCardCode']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  expiryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  pollingUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserApplication'] = ResolversParentTypes['UserApplication']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  mobileNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  logs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ApplicationLog']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type GiveGiftResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GiveGift'] = ResolversParentTypes['GiveGift']
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type CreateUserApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateUserApplication'] = ResolversParentTypes['CreateUserApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['UserApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type VerifyUserApplicationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VerifyUserApplication'] = ResolversParentTypes['VerifyUserApplication']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['UserApplication']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ConfirmMobileResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ConfirmMobile'] = ResolversParentTypes['ConfirmMobile']
> = {
  mobile?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = Context> = {
  AuthUser?: AuthUserResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  StringTrimmed?: GraphQLScalarType
  Company?: CompanyResolvers<ContextType>
  ApplicationLog?: ApplicationLogResolvers<ContextType>
  CompanyApplication?: CompanyApplicationResolvers<ContextType>
  CreateCompanyApplication?: CreateCompanyApplicationResolvers<ContextType>
  ApproveCompanyApplication?: ApproveCompanyApplicationResolvers<ContextType>
  RejectCompanyApplication?: RejectCompanyApplicationResolvers<ContextType>
  UpdateCompanyApplication?: UpdateCompanyApplicationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Greeting?: GreetingResolvers<ContextType>
  GiftDetail?: GiftDetailResolvers<ContextType>
  GiftCard?: GiftCardResolvers<ContextType>
  GiftCardCode?: GiftCardCodeResolvers<ContextType>
  UserApplication?: UserApplicationResolvers<ContextType>
  GiveGift?: GiveGiftResolvers<ContextType>
  CreateUserApplication?: CreateUserApplicationResolvers<ContextType>
  VerifyUserApplication?: VerifyUserApplicationResolvers<ContextType>
  ConfirmMobile?: ConfirmMobileResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
