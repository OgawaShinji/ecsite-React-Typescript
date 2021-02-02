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
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
  imagePath?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Int']>;
};

export type Topping = {
  __typename?: 'Topping';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id?: Maybe<Scalars['Int']>;
  item?: Maybe<Item>;
  orderToppings?: Maybe<Array<Maybe<OrderTopping>>>;
  quantity?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  subTotalPrice?: Maybe<Scalars['Int']>;
};

export type OrderTopping = {
  __typename?: 'OrderTopping';
  id?: Maybe<Scalars['Int']>;
  topping?: Maybe<Topping>;
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

export type OrderInfo = {
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
};

export type UpTopping = {
  topping?: Maybe<Scalars['Int']>;
};

export type UpOrderItem = {
  id?: Maybe<Scalars['Int']>;
  item?: Maybe<Scalars['Int']>;
  orderToppings?: Maybe<Array<Maybe<UpTopping>>>;
  size?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type OrderItemInput = {
  orderItems?: Maybe<Array<Maybe<UpOrderItem>>>;
};

export type TotalPrice = {
  totalPrice?: Maybe<Scalars['Int']>;
};

export type DeleteOrderItemId = {
  orderItemId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Order>;
  users?: Maybe<Array<Maybe<User>>>;
  toppings?: Maybe<Array<Maybe<Topping>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postUser?: Maybe<User>;
  updateOrderInfo?: Maybe<Order>;
  update?: Maybe<Array<Maybe<User>>>;
  updateOrderItem?: Maybe<Order>;
  deleteOrderItem?: Maybe<Order>;
};


export type MutationPostUserArgs = {
  userInfo: UserInfo;
};


export type MutationUpdateOrderInfoArgs = {
  orderInfo: OrderInfo;
};


export type MutationUpdateArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type MutationUpdateOrderItemArgs = {
  orderItemInput: OrderItemInput;
  status?: Maybe<Scalars['Int']>;
  totalPrice?: Maybe<TotalPrice>;
};


export type MutationDeleteOrderItemArgs = {
  deleteOrderItemId: DeleteOrderItemId;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type FetchToppingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchToppingsQuery = (
  { __typename?: 'Query' }
  & { toppings?: Maybe<Array<Maybe<(
    { __typename?: 'Topping' }
    & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
  )>>> }
);


export const FetchToppingsDocument = gql`
    query fetchToppings {
  toppings {
    id
    name
    priceM
    priceL
  }
}
    `;

/**
 * __useFetchToppingsQuery__
 *
 * To run a query within a React component, call `useFetchToppingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchToppingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchToppingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchToppingsQuery(baseOptions?: Apollo.QueryHookOptions<FetchToppingsQuery, FetchToppingsQueryVariables>) {
        return Apollo.useQuery<FetchToppingsQuery, FetchToppingsQueryVariables>(FetchToppingsDocument, baseOptions);
      }
export function useFetchToppingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchToppingsQuery, FetchToppingsQueryVariables>) {
          return Apollo.useLazyQuery<FetchToppingsQuery, FetchToppingsQueryVariables>(FetchToppingsDocument, baseOptions);
        }
export type FetchToppingsQueryHookResult = ReturnType<typeof useFetchToppingsQuery>;
export type FetchToppingsLazyQueryHookResult = ReturnType<typeof useFetchToppingsLazyQuery>;
export type FetchToppingsQueryResult = Apollo.QueryResult<FetchToppingsQuery, FetchToppingsQueryVariables>;