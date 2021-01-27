import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  items?: Maybe<ItemTypeConnection>;
  /** The ID of the object */
  item?: Maybe<ItemType>;
  user?: Maybe<UserType>;
  registerUser?: Maybe<UserType>;
  orderHistory?: Maybe<OrderHistoryTypeConnection>;
};


export type QueryItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name_Icontains?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryOrderHistoryArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ItemTypeConnection = {
  __typename?: 'ItemTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ItemTypeEdge>>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** A Relay edge containing a `ItemType` and its cursor. */
export type ItemTypeEdge = {
  __typename?: 'ItemTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ItemType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ItemType = Node & {
  __typename?: 'ItemType';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  priceM: Scalars['Int'];
  priceL: Scalars['Int'];
  imagePath: Scalars['String'];
  deleted: Scalars['Boolean'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type UserType = Node & {
  __typename?: 'UserType';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  zipcode: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  status: Scalars['String'];
  orderSet: OrderHistoryTypeConnection;
};


export type UserTypeOrderSetArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type OrderHistoryTypeConnection = {
  __typename?: 'OrderHistoryTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderHistoryTypeEdge>>;
};

/** A Relay edge containing a `OrderHistoryType` and its cursor. */
export type OrderHistoryTypeEdge = {
  __typename?: 'OrderHistoryTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderHistoryType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrderHistoryType = Node & {
  __typename?: 'OrderHistoryType';
  /** The ID of the object. */
  id: Scalars['ID'];
  user: UserType;
  status: Scalars['Int'];
  totalPrice: Scalars['Int'];
  orderDate?: Maybe<Scalars['Date']>;
  destinationName: Scalars['String'];
  destinationEmail: Scalars['String'];
  destinationZipcode: Scalars['String'];
  destinationAddress: Scalars['String'];
  destinationTel: Scalars['String'];
  deliveryTime?: Maybe<Scalars['DateTime']>;
  paymentMethod?: Maybe<Scalars['Int']>;
};



export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserSerializerMutationPayload>;
};


export type MutationRegisterUserArgs = {
  input: UserSerializerMutationInput;
};

export type UserSerializerMutationPayload = {
  __typename?: 'UserSerializerMutationPayload';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** May contain more than one error for same field. */
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type UserSerializerMutationInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  zipcode: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type FetchItemNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchItemNamesQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<(
    { __typename?: 'ItemTypeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ItemTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ItemType' }
        & Pick<ItemType, 'name'>
      )> }
    )>> }
  )> }
);

export type FetchItemsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}>;


export type FetchItemsQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<(
    { __typename?: 'ItemTypeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ItemTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ItemType' }
        & Pick<ItemType, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
      )> }
    )>> }
  )> }
);


export const FetchItemNamesDocument = gql`
    query fetchItemNames {
  items {
    edges {
      node {
        name
      }
    }
  }
}
    `;

/**
 * __useFetchItemNamesQuery__
 *
 * To run a query within a React component, call `useFetchItemNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchItemNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchItemNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchItemNamesQuery(baseOptions?: Apollo.QueryHookOptions<FetchItemNamesQuery, FetchItemNamesQueryVariables>) {
        return Apollo.useQuery<FetchItemNamesQuery, FetchItemNamesQueryVariables>(FetchItemNamesDocument, baseOptions);
      }
export function useFetchItemNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemNamesQuery, FetchItemNamesQueryVariables>) {
          return Apollo.useLazyQuery<FetchItemNamesQuery, FetchItemNamesQueryVariables>(FetchItemNamesDocument, baseOptions);
        }
export type FetchItemNamesQueryHookResult = ReturnType<typeof useFetchItemNamesQuery>;
export type FetchItemNamesLazyQueryHookResult = ReturnType<typeof useFetchItemNamesLazyQuery>;
export type FetchItemNamesQueryResult = Apollo.QueryResult<FetchItemNamesQuery, FetchItemNamesQueryVariables>;
export const FetchItemsDocument = gql`
    query fetchItems($first: Int, $offset: Int, $sort: String, $name: String) {
  items(first: $first, orderBy: $sort, offset: $offset, name_Icontains: $name) {
    edges {
      node {
        id
        name
        description
        priceM
        priceL
        imagePath
        deleted
      }
    }
  }
}
    `;

/**
 * __useFetchItemsQuery__
 *
 * To run a query within a React component, call `useFetchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchItemsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFetchItemsQuery(baseOptions?: Apollo.QueryHookOptions<FetchItemsQuery, FetchItemsQueryVariables>) {
        return Apollo.useQuery<FetchItemsQuery, FetchItemsQueryVariables>(FetchItemsDocument, baseOptions);
      }
export function useFetchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemsQuery, FetchItemsQueryVariables>) {
          return Apollo.useLazyQuery<FetchItemsQuery, FetchItemsQueryVariables>(FetchItemsDocument, baseOptions);
        }
export type FetchItemsQueryHookResult = ReturnType<typeof useFetchItemsQuery>;
export type FetchItemsLazyQueryHookResult = ReturnType<typeof useFetchItemsLazyQuery>;
export type FetchItemsQueryResult = Apollo.QueryResult<FetchItemsQuery, FetchItemsQueryVariables>;