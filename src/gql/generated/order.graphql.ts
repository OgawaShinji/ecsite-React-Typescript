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

export type Query = {
  __typename?: 'Query';
  order?: Maybe<Order>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postUser?: Maybe<User>;
  updateOrderInfo?: Maybe<Order>;
  update?: Maybe<Array<Maybe<User>>>;
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

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type FetchOrderItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchOrderItemsQuery = (
  { __typename?: 'Query' }
  & { order?: Maybe<(
    { __typename?: 'Order' }
    & { orderItems?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'quantity' | 'size' | 'subTotalPrice'>
      & { item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
      )>, orderToppings?: Maybe<Array<Maybe<(
        { __typename?: 'OrderTopping' }
        & Pick<OrderTopping, 'id' | 'orderItemId'>
        & { topping?: Maybe<(
          { __typename?: 'Topping' }
          & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type UpdateOrderMutationVariables = Exact<{
  orderInfo: OrderInfo;
}>;


export type UpdateOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateOrderInfo?: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'status' | 'orderDate' | 'destinationName' | 'destinationEmail' | 'destinationZipcode' | 'destinationAddress' | 'destinationTel' | 'deliveryTime' | 'totalPrice' | 'paymentMethod'>
  )> }
);

export type FetchOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchOrderQuery = (
  { __typename?: 'Query' }
  & { order?: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'status' | 'orderDate' | 'deliveryTime' | 'destinationName' | 'destinationEmail' | 'destinationZipcode' | 'destinationAddress' | 'destinationTel' | 'totalPrice' | 'paymentMethod'>
    & { orderItems?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'quantity' | 'size' | 'subTotalPrice'>
      & { item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'name' | 'description' | 'priceM'>
      )>, orderToppings?: Maybe<Array<Maybe<(
        { __typename?: 'OrderTopping' }
        & Pick<OrderTopping, 'id' | 'orderItemId'>
        & { topping?: Maybe<(
          { __typename?: 'Topping' }
          & Pick<Topping, 'id' | 'name' | 'priceM'>
        )> }
      )>>> }
    )>>> }
  )> }
);


export const FetchOrderItemsDocument = gql`
    query fetchOrderItems {
  order {
    orderItems {
      id
      item {
        id
        name
        description
        priceM
        priceL
        imagePath
        deleted
      }
      orderToppings {
        id
        topping {
          id
          name
          priceM
          priceL
        }
        orderItemId
      }
      quantity
      size
      subTotalPrice
    }
  }
}
    `;

/**
 * __useFetchOrderItemsQuery__
 *
 * To run a query within a React component, call `useFetchOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrderItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchOrderItemsQuery(baseOptions?: Apollo.QueryHookOptions<FetchOrderItemsQuery, FetchOrderItemsQueryVariables>) {
        return Apollo.useQuery<FetchOrderItemsQuery, FetchOrderItemsQueryVariables>(FetchOrderItemsDocument, baseOptions);
      }
export function useFetchOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOrderItemsQuery, FetchOrderItemsQueryVariables>) {
          return Apollo.useLazyQuery<FetchOrderItemsQuery, FetchOrderItemsQueryVariables>(FetchOrderItemsDocument, baseOptions);
        }
export type FetchOrderItemsQueryHookResult = ReturnType<typeof useFetchOrderItemsQuery>;
export type FetchOrderItemsLazyQueryHookResult = ReturnType<typeof useFetchOrderItemsLazyQuery>;
export type FetchOrderItemsQueryResult = Apollo.QueryResult<FetchOrderItemsQuery, FetchOrderItemsQueryVariables>;
export const UpdateOrderDocument = gql`
    mutation updateOrder($orderInfo: OrderInfo!) {
  updateOrderInfo(orderInfo: $orderInfo) {
    status
    orderDate
    destinationName
    destinationEmail
    destinationZipcode
    destinationAddress
    destinationTel
    deliveryTime
    totalPrice
    paymentMethod
  }
}
    `;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      orderInfo: // value for 'orderInfo'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, baseOptions);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const FetchOrderDocument = gql`
    query fetchOrder {
  order {
    id
    status
    orderDate
    deliveryTime
    destinationName
    destinationEmail
    destinationZipcode
    destinationAddress
    destinationTel
    totalPrice
    paymentMethod
    orderItems {
      id
      item {
        name
        description
        priceM
      }
      orderToppings {
        id
        topping {
          id
          name
          priceM
        }
        orderItemId
      }
      quantity
      size
      subTotalPrice
    }
  }
}
    `;

/**
 * __useFetchOrderQuery__
 *
 * To run a query within a React component, call `useFetchOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchOrderQuery(baseOptions?: Apollo.QueryHookOptions<FetchOrderQuery, FetchOrderQueryVariables>) {
        return Apollo.useQuery<FetchOrderQuery, FetchOrderQueryVariables>(FetchOrderDocument, baseOptions);
      }
export function useFetchOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOrderQuery, FetchOrderQueryVariables>) {
          return Apollo.useLazyQuery<FetchOrderQuery, FetchOrderQueryVariables>(FetchOrderDocument, baseOptions);
        }
export type FetchOrderQueryHookResult = ReturnType<typeof useFetchOrderQuery>;
export type FetchOrderLazyQueryHookResult = ReturnType<typeof useFetchOrderLazyQuery>;
export type FetchOrderQueryResult = Apollo.QueryResult<FetchOrderQuery, FetchOrderQueryVariables>;