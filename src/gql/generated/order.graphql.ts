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
  postUser?: Maybe<Array<Maybe<User>>>;
  update?: Maybe<Array<Maybe<User>>>;
  updateOrderItem?: Maybe<Order>;
  deleteOrderItem?: Maybe<Order>;
};


export type MutationPostUserArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
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


export type FetchOrderItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchOrderItemsQuery = (
  { __typename?: 'Query' }
  & { cart?: Maybe<(
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

export type UpdateOrderItemMutationVariables = Exact<{
  orderItemInput: OrderItemInput;
  totalPrice?: Maybe<TotalPrice>;
}>;


export type UpdateOrderItemMutation = (
  { __typename?: 'Mutation' }
  & { updateOrderItem?: Maybe<(
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

export type DeleteOrderMutationVariables = Exact<{
  deleteOrderItemId: DeleteOrderItemId;
}>;


export type DeleteOrderMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrderItem?: Maybe<(
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


export const FetchOrderItemsDocument = gql`
    query fetchOrderItems {
  cart {
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
export const UpdateOrderItemDocument = gql`
    mutation updateOrderItem($orderItemInput: OrderItemInput!, $totalPrice: TotalPrice) {
  updateOrderItem(
    orderItemInput: $orderItemInput
    status: 0
    totalPrice: $totalPrice
  ) {
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
export type UpdateOrderItemMutationFn = Apollo.MutationFunction<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>;

/**
 * __useUpdateOrderItemMutation__
 *
 * To run a mutation, you first call `useUpdateOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderItemMutation, { data, loading, error }] = useUpdateOrderItemMutation({
 *   variables: {
 *      orderItemInput: // value for 'orderItemInput'
 *      totalPrice: // value for 'totalPrice'
 *   },
 * });
 */
export function useUpdateOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>) {
        return Apollo.useMutation<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>(UpdateOrderItemDocument, baseOptions);
      }
export type UpdateOrderItemMutationHookResult = ReturnType<typeof useUpdateOrderItemMutation>;
export type UpdateOrderItemMutationResult = Apollo.MutationResult<UpdateOrderItemMutation>;
export type UpdateOrderItemMutationOptions = Apollo.BaseMutationOptions<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation deleteOrder($deleteOrderItemId: DeleteOrderItemId!) {
  deleteOrderItem(deleteOrderItemId: $deleteOrderItemId) {
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
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      deleteOrderItemId: // value for 'deleteOrderItemId'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, baseOptions);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;