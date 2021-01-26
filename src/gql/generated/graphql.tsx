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
};

export type Query = {
  __typename?: 'Query';
  items?: Maybe<ItemNodeConnection>;
  /** The ID of the object */
  item?: Maybe<ItemNode>;
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

export type ItemNodeConnection = {
  __typename?: 'ItemNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ItemNodeEdge>>;
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

/** A Relay edge containing a `ItemNode` and its cursor. */
export type ItemNodeEdge = {
  __typename?: 'ItemNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ItemNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ItemNode = Node & {
  __typename?: 'ItemNode';
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

export type FetchItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchItemsQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<(
    { __typename?: 'ItemNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ItemNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ItemNode' }
        & Pick<ItemNode, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
      )> }
    )>> }
  )> }
);


export const FetchItemsDocument = gql`
    query fetchItems {
  items {
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