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
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
  imagePath?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Int']>;
};

export type Topping = {
  __typename?: 'Topping';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id?: Maybe<Scalars['ID']>;
  item?: Maybe<Item>;
  orderToppings?: Maybe<Array<Maybe<OrderTopping>>>;
  quantity?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  subTotalPrice?: Maybe<Scalars['Int']>;
};

export type OrderTopping = {
  __typename?: 'OrderTopping';
  id?: Maybe<Scalars['ID']>;
  topping?: Maybe<Topping>;
  orderItemId?: Maybe<Scalars['Int']>;
};

export type Order = {
  __typename?: 'Order';
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  status?: Maybe<Scalars['Int']>;
  orderDate?: Maybe<Scalars['String']>;
  deliveryTime?: Maybe<Scalars['Date']>;
  destinationName?: Maybe<Scalars['String']>;
  destinationEmail?: Maybe<Scalars['String']>;
  destinationZipcode?: Maybe<Scalars['String']>;
  destinationAddress?: Maybe<Scalars['String']>;
  destinationTel?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['Int']>;
  orderItems?: Maybe<Array<Maybe<OrderItem>>>;
};

export type SearchForm = {
  __typename?: 'SearchForm';
  itemName?: Maybe<Scalars['String']>;
  sortId?: Maybe<Scalars['Int']>;
};

export type UserInfo = {
  name: Scalars['String'];
  email: Scalars['String'];
  zipcode: Scalars['String'];
  address: Scalars['String'];
  telephone: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  order?: Maybe<Order>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postUser?: Maybe<User>;
  update?: Maybe<Array<Maybe<User>>>;
};


export type MutationPostUserArgs = {
  userInfo: UserInfo;
};


export type MutationUpdateArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type PostRegisterMutationVariables = Exact<{
  userInfo: UserInfo;
}>;


export type PostRegisterMutation = (
  { __typename?: 'Mutation' }
  & { postUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'zipcode' | 'address' | 'telephone' | 'status' | 'password'>
  )> }
);

export type ListUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUserQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'zipcode' | 'address' | 'telephone' | 'status' | 'password'>
  )>>> }
);


export const PostRegisterDocument = gql`
    mutation postRegister($userInfo: UserInfo!) {
  postUser(userInfo: $userInfo) {
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
    `;
export type PostRegisterMutationFn = Apollo.MutationFunction<PostRegisterMutation, PostRegisterMutationVariables>;

/**
 * __usePostRegisterMutation__
 *
 * To run a mutation, you first call `usePostRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postRegisterMutation, { data, loading, error }] = usePostRegisterMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *   },
 * });
 */
export function usePostRegisterMutation(baseOptions?: Apollo.MutationHookOptions<PostRegisterMutation, PostRegisterMutationVariables>) {
        return Apollo.useMutation<PostRegisterMutation, PostRegisterMutationVariables>(PostRegisterDocument, baseOptions);
      }
export type PostRegisterMutationHookResult = ReturnType<typeof usePostRegisterMutation>;
export type PostRegisterMutationResult = Apollo.MutationResult<PostRegisterMutation>;
export type PostRegisterMutationOptions = Apollo.BaseMutationOptions<PostRegisterMutation, PostRegisterMutationVariables>;
export const ListUserDocument = gql`
    query listUser {
  users {
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
    `;

/**
 * __useListUserQuery__
 *
 * To run a query within a React component, call `useListUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUserQuery(baseOptions?: Apollo.QueryHookOptions<ListUserQuery, ListUserQueryVariables>) {
        return Apollo.useQuery<ListUserQuery, ListUserQueryVariables>(ListUserDocument, baseOptions);
      }
export function useListUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUserQuery, ListUserQueryVariables>) {
          return Apollo.useLazyQuery<ListUserQuery, ListUserQueryVariables>(ListUserDocument, baseOptions);
        }
export type ListUserQueryHookResult = ReturnType<typeof useListUserQuery>;
export type ListUserLazyQueryHookResult = ReturnType<typeof useListUserLazyQuery>;
export type ListUserQueryResult = Apollo.QueryResult<ListUserQuery, ListUserQueryVariables>;