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

export type ReturnOrder = {
  __typename?: 'ReturnOrder';
  order?: Maybe<Order>;
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
  item?: Maybe<Item>;
};


export type QueryItemArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postUser?: Maybe<User>;
  updateOrderInfo?: Maybe<Order>;
  update?: Maybe<Array<Maybe<User>>>;
  updateOrderItem?: Maybe<Order>;
  deleteOrderItem?: Maybe<Order>;
  addCart?: Maybe<ReturnOrder>;
};


export type MutationPostUserArgs = {
  userInfo: UserInfo;
};


export type MutationUpdateOrderInfoArgs = {
  orderInfo: OrderInfo;
};


export type MutationUpdateArgs = {
  id: Scalars['Int'];
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


export type MutationAddCartArgs = {
  orderItem: UpOrderItem;
  status?: Maybe<Scalars['Int']>;
  totalPrice: Scalars['Int'];
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
    & Pick<Order, 'totalPrice'>
    & { orderItems?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'quantity' | 'size' | 'subTotalPrice'>
      & OrderItemFragFragment
    )>>> }
  )> }
);

export type OrderItemFragFragment = (
  { __typename?: 'OrderItem' }
  & Pick<OrderItem, 'id' | 'quantity' | 'size' | 'subTotalPrice'>
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & ItemFragFragment
  )>, orderToppings?: Maybe<Array<Maybe<(
    { __typename?: 'OrderTopping' }
    & OrderToppingFragFragment
  )>>> }
);

export type ItemFragFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
);

export type OrderToppingFragFragment = (
  { __typename?: 'OrderTopping' }
  & Pick<OrderTopping, 'id'>
  & { topping?: Maybe<(
    { __typename?: 'Topping' }
    & ToppingFragFragment
  )> }
);

export type ToppingFragFragment = (
  { __typename?: 'Topping' }
  & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
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
        & Pick<OrderTopping, 'id'>
        & { topping?: Maybe<(
          { __typename?: 'Topping' }
          & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type DeleteOrderItemMutationVariables = Exact<{
  deleteOrderItemId: DeleteOrderItemId;
}>;


export type DeleteOrderItemMutation = (
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
        & Pick<OrderTopping, 'id'>
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
  & { cart?: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'status' | 'orderDate' | 'deliveryTime' | 'destinationName' | 'destinationEmail' | 'destinationZipcode' | 'destinationAddress' | 'destinationTel' | 'totalPrice' | 'paymentMethod'>
    & { orderItems?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'quantity' | 'size'>
      & { item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'name' | 'description' | 'priceM'>
      )>, orderToppings?: Maybe<Array<Maybe<(
        { __typename?: 'OrderTopping' }
        & Pick<OrderTopping, 'id'>
        & { topping?: Maybe<(
          { __typename?: 'Topping' }
          & Pick<Topping, 'id' | 'name' | 'priceM'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type AddCartMutationVariables = Exact<{
  orderItem: UpOrderItem;
  totalPrice: Scalars['Int'];
}>;


export type AddCartMutation = (
  { __typename?: 'Mutation' }
  & { addCart?: Maybe<(
    { __typename?: 'ReturnOrder' }
    & { order?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'status' | 'totalPrice'>
      & { orderItems?: Maybe<Array<Maybe<(
        { __typename?: 'OrderItem' }
        & { item?: Maybe<(
          { __typename?: 'Item' }
          & Pick<Item, 'name'>
        )>, orderToppings?: Maybe<Array<Maybe<(
          { __typename?: 'OrderTopping' }
          & { topping?: Maybe<(
            { __typename?: 'Topping' }
            & Pick<Topping, 'name'>
          )> }
        )>>> }
      )>>> }
    )> }
  )> }
);

export type FetchToppingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchToppingsQuery = (
  { __typename?: 'Query' }
  & { toppings?: Maybe<Array<Maybe<(
    { __typename?: 'Topping' }
    & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
  )>>> }
);

export type FetchItemQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type FetchItemQuery = (
  { __typename?: 'Query' }
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
  )> }
);

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

export const ItemFragFragmentDoc = gql`
    fragment ItemFrag on Item {
  id
  name
  description
  priceM
  priceL
  imagePath
  deleted
}
    `;
export const ToppingFragFragmentDoc = gql`
    fragment ToppingFrag on Topping {
  id
  name
  priceM
  priceL
}
    `;
export const OrderToppingFragFragmentDoc = gql`
    fragment OrderToppingFrag on OrderTopping {
  id
  topping {
    ...ToppingFrag
  }
}
    ${ToppingFragFragmentDoc}`;
export const OrderItemFragFragmentDoc = gql`
    fragment OrderItemFrag on OrderItem {
  id
  item {
    ...ItemFrag
  }
  orderToppings {
    ...OrderToppingFrag
  }
  quantity
  size
  subTotalPrice
}
    ${ItemFragFragmentDoc}
${OrderToppingFragFragmentDoc}`;
export const FetchOrderItemsDocument = gql`
    query fetchOrderItems {
  cart {
    orderItems {
      ...OrderItemFrag
      quantity
      size
      subTotalPrice
    }
    totalPrice
  }
}
    ${OrderItemFragFragmentDoc}`;

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
export const DeleteOrderItemDocument = gql`
    mutation deleteOrderItem($deleteOrderItemId: DeleteOrderItemId!) {
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
      }
      quantity
      size
      subTotalPrice
    }
  }
}
    `;
export type DeleteOrderItemMutationFn = Apollo.MutationFunction<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>;

/**
 * __useDeleteOrderItemMutation__
 *
 * To run a mutation, you first call `useDeleteOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderItemMutation, { data, loading, error }] = useDeleteOrderItemMutation({
 *   variables: {
 *      deleteOrderItemId: // value for 'deleteOrderItemId'
 *   },
 * });
 */
export function useDeleteOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>) {
        return Apollo.useMutation<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>(DeleteOrderItemDocument, baseOptions);
      }
export type DeleteOrderItemMutationHookResult = ReturnType<typeof useDeleteOrderItemMutation>;
export type DeleteOrderItemMutationResult = Apollo.MutationResult<DeleteOrderItemMutation>;
export type DeleteOrderItemMutationOptions = Apollo.BaseMutationOptions<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>;
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
  cart {
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
      }
      quantity
      size
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
export const AddCartDocument = gql`
    mutation addCart($orderItem: UpOrderItem!, $totalPrice: Int!) {
  addCart(orderItem: $orderItem, status: 0, totalPrice: $totalPrice) {
    order {
      orderItems {
        item {
          name
        }
        orderToppings {
          topping {
            name
          }
        }
      }
      status
      totalPrice
    }
  }
}
    `;
export type AddCartMutationFn = Apollo.MutationFunction<AddCartMutation, AddCartMutationVariables>;

/**
 * __useAddCartMutation__
 *
 * To run a mutation, you first call `useAddCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCartMutation, { data, loading, error }] = useAddCartMutation({
 *   variables: {
 *      orderItem: // value for 'orderItem'
 *      totalPrice: // value for 'totalPrice'
 *   },
 * });
 */
export function useAddCartMutation(baseOptions?: Apollo.MutationHookOptions<AddCartMutation, AddCartMutationVariables>) {
        return Apollo.useMutation<AddCartMutation, AddCartMutationVariables>(AddCartDocument, baseOptions);
      }
export type AddCartMutationHookResult = ReturnType<typeof useAddCartMutation>;
export type AddCartMutationResult = Apollo.MutationResult<AddCartMutation>;
export type AddCartMutationOptions = Apollo.BaseMutationOptions<AddCartMutation, AddCartMutationVariables>;
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
export const FetchItemDocument = gql`
    query fetchItem($id: Int) {
  item(id: $id) {
    id
    name
    description
    priceM
    priceL
    imagePath
    deleted
  }
}
    `;

/**
 * __useFetchItemQuery__
 *
 * To run a query within a React component, call `useFetchItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchItemQuery(baseOptions?: Apollo.QueryHookOptions<FetchItemQuery, FetchItemQueryVariables>) {
        return Apollo.useQuery<FetchItemQuery, FetchItemQueryVariables>(FetchItemDocument, baseOptions);
      }
export function useFetchItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemQuery, FetchItemQueryVariables>) {
          return Apollo.useLazyQuery<FetchItemQuery, FetchItemQueryVariables>(FetchItemDocument, baseOptions);
        }
export type FetchItemQueryHookResult = ReturnType<typeof useFetchItemQuery>;
export type FetchItemLazyQueryHookResult = ReturnType<typeof useFetchItemLazyQuery>;
export type FetchItemQueryResult = Apollo.QueryResult<FetchItemQuery, FetchItemQueryVariables>;
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