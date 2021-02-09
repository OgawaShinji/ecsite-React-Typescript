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
  /** DateTime custom scalar type */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};




export type UserType = {
  __typename?: 'UserType';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
};

export type ItemType = {
  __typename?: 'ItemType';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
  imagePath?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
};

export type ToppingType = {
  __typename?: 'ToppingType';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  priceM?: Maybe<Scalars['Int']>;
  priceL?: Maybe<Scalars['Int']>;
};

export type OrderItemType = {
  __typename?: 'OrderItemType';
  id?: Maybe<Scalars['ID']>;
  item?: Maybe<ItemType>;
  orderToppings?: Maybe<OrderToppingTypeConnection>;
  quantity?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  subTotalPrice?: Maybe<Scalars['Int']>;
};

export type OrderToppingType = {
  __typename?: 'OrderToppingType';
  id?: Maybe<Scalars['ID']>;
  topping?: Maybe<ToppingType>;
  orderItem?: Maybe<OrderItemType>;
};

export type OrderType = {
  __typename?: 'OrderType';
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<UserType>;
  status?: Maybe<Scalars['Int']>;
  totalPrice?: Maybe<Scalars['Int']>;
  orderDate?: Maybe<Scalars['Date']>;
  destinationName?: Maybe<Scalars['String']>;
  destinationEmail?: Maybe<Scalars['String']>;
  destinationZipcode?: Maybe<Scalars['String']>;
  destinationAddress?: Maybe<Scalars['String']>;
  destinationTel?: Maybe<Scalars['String']>;
  deliveryTime?: Maybe<Scalars['DateTime']>;
  paymentMethod?: Maybe<Scalars['Int']>;
  orderItems?: Maybe<OrderItemTypeConnection>;
};

export type OrderHistoryType = {
  __typename?: 'OrderHistoryType';
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<UserType>;
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
  orderItems?: Maybe<OrderItemTypeConnection>;
};

export type SearchForm = {
  __typename?: 'SearchForm';
  itemName?: Maybe<Scalars['String']>;
  sortId?: Maybe<Scalars['Int']>;
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

export type OrderInput = {
  status: Scalars['Int'];
  orderDate: Scalars['Date'];
  destinationName: Scalars['String'];
  destinationEmail: Scalars['String'];
  destinationZipcode: Scalars['String'];
  destinationAddress: Scalars['String'];
  destinationTel: Scalars['String'];
  deliveryTime: Scalars['DateTime'];
  paymentMethod: Scalars['Int'];
};

export type OrderToppingInput = {
  topping?: Maybe<Scalars['ID']>;
};

export type OrderItemInput = {
  id?: Maybe<Scalars['ID']>;
  item?: Maybe<Scalars['ID']>;
  orderToppings: Array<Maybe<OrderToppingInput>>;
  size?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type TotalPrice = {
  totalPrice?: Maybe<Scalars['Int']>;
};

export type DeleteOrderItemId = {
  orderItemId?: Maybe<Scalars['Int']>;
};

export type ItemTypeConnection = {
  __typename?: 'ItemTypeConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<ItemTypeEdge>>>;
};

export type ItemTypeEdge = {
  __typename?: 'ItemTypeEdge';
  node?: Maybe<ItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type ToppingTypeConnection = {
  __typename?: 'ToppingTypeConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<ToppingTypeEdge>>>;
};

export type ToppingTypeEdge = {
  __typename?: 'ToppingTypeEdge';
  node?: Maybe<ToppingType>;
  cursor?: Maybe<Scalars['String']>;
};

export type OrderHistoryTypeConnection = {
  __typename?: 'OrderHistoryTypeConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<OrderHistoryTypeEdge>>>;
};

export type OrderHistoryTypeEdge = {
  __typename?: 'OrderHistoryTypeEdge';
  node?: Maybe<OrderHistoryType>;
  cursor?: Maybe<Scalars['String']>;
};

export type OrderItemTypeConnection = {
  __typename?: 'OrderItemTypeConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<OrderItemTypeEdge>>>;
};

export type OrderItemTypeEdge = {
  __typename?: 'OrderItemTypeEdge';
  node?: Maybe<OrderItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type OrderToppingTypeConnection = {
  __typename?: 'OrderToppingTypeConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<OrderToppingTypeEdge>>>;
};

export type OrderToppingTypeEdge = {
  __typename?: 'OrderToppingTypeEdge';
  node?: Maybe<OrderToppingType>;
  cursor?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type AddCart = {
  __typename?: 'AddCart';
  order?: Maybe<OrderType>;
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
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ExecuteOrder = {
  __typename?: 'ExecuteOrder';
  order?: Maybe<OrderType>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type UpdateCart = {
  __typename?: 'UpdateCart';
  order?: Maybe<OrderType>;
};

export type DeleteCart = {
  __typename?: 'DeleteCart';
  order?: Maybe<OrderType>;
};

export type Query = {
  __typename?: 'Query';
  toppings?: Maybe<ToppingTypeConnection>;
  item?: Maybe<ItemType>;
  items?: Maybe<ItemTypeConnection>;
  cart?: Maybe<OrderType>;
  orderHistory?: Maybe<OrderHistoryTypeConnection>;
};


export type QueryToppingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name_Icontains?: Maybe<Scalars['String']>;
};


export type QueryItemArgs = {
  id?: Maybe<Scalars['ID']>;
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


export type QueryOrderHistoryArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name_Icontains?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserSerializerMutationPayload>;
  addCart?: Maybe<AddCart>;
  executeOrder?: Maybe<ExecuteOrder>;
};


export type MutationRegisterUserArgs = {
  input: UserSerializerMutationInput;
  updateCart?: Maybe<UpdateCart>;
  deleteCart?: Maybe<DeleteCart>;
};


export type MutationAddCartArgs = {
  orderItem: OrderItemInput;
  status?: Maybe<Scalars['Int']>;
  totalPrice: Scalars['Int'];
};

export type MutationExecuteOrderArgs = {
  order: OrderInput;
};

export type MutationUpdateCartArgs = {
  orderItems: Array<Maybe<OrderItemInput>>;
  status: Scalars['Int'];
  totalPrice: Scalars['Int'];
};

export type MutationDeleteCartArgs = {
  orderItemId: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type FetchOrderItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchOrderItemsQuery = (
  { __typename?: 'Query' }
  & { cart?: Maybe<(
    { __typename?: 'OrderType' }
    & Pick<OrderType, 'totalPrice'>
    & { orderItems?: Maybe<(
      { __typename?: 'OrderItemTypeConnection' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'OrderItemTypeEdge' }
        & { node?: Maybe<(
          { __typename?: 'OrderItemType' }
          & Pick<OrderItemType, 'id' | 'size' | 'quantity' | 'subTotalPrice'>
          & { item?: Maybe<(
            { __typename?: 'ItemType' }
            & Pick<ItemType, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
          )>, orderToppings?: Maybe<(
            { __typename?: 'OrderToppingTypeConnection' }
            & { edges?: Maybe<Array<Maybe<(
              { __typename?: 'OrderToppingTypeEdge' }
              & { node?: Maybe<(
                { __typename?: 'OrderToppingType' }
                & Pick<OrderToppingType, 'id'>
                & { topping?: Maybe<(
                  { __typename?: 'ToppingType' }
                  & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
                )> }
              )> }
            )>>> }
          )> }
        )> }
      )>>> }
    )> }
  )> }
);

export type AddCartMutationVariables = Exact<{
  orderItem: OrderItemInput;
  totalPrice: Scalars['Int'];
}>;


export type AddCartMutation = (
  { __typename?: 'Mutation' }
  & { addCart?: Maybe<(
    { __typename?: 'AddCart' }
    & { order?: Maybe<(
      { __typename?: 'OrderType' }
      & Pick<OrderType, 'status' | 'totalPrice'>
      & { orderItems?: Maybe<(
        { __typename?: 'OrderItemTypeConnection' }
        & { edges?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemTypeEdge' }
          & { node?: Maybe<(
            { __typename?: 'OrderItemType' }
            & Pick<OrderItemType, 'size' | 'quantity'>
            & { item?: Maybe<(
              { __typename?: 'ItemType' }
              & Pick<ItemType, 'name'>
            )>, orderToppings?: Maybe<(
              { __typename?: 'OrderToppingTypeConnection' }
              & { edges?: Maybe<Array<Maybe<(
                { __typename?: 'OrderToppingTypeEdge' }
                & { node?: Maybe<(
                  { __typename?: 'OrderToppingType' }
                  & { topping?: Maybe<(
                    { __typename?: 'ToppingType' }
                    & Pick<ToppingType, 'name'>
                  )> }
                )> }
              )>>> }
            )> }
          )> }
        )>>> }
      )> }
    )> }
  )> }
);


export type OrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type OrderMutation = (
  { __typename?: 'Mutation' }
  & { executeOrder?: Maybe<(
    { __typename?: 'ExecuteOrder' }
    & { order?: Maybe<(
      { __typename?: 'OrderType' }
      & Pick<OrderType, 'id' | 'status' | 'orderDate' | 'deliveryTime' | 'destinationName' | 'destinationEmail' | 'destinationZipcode' | 'destinationAddress' | 'destinationTel' | 'totalPrice' | 'paymentMethod'>

export type UpdateCartMutationVariables = Exact<{
  orderItems: Array<Maybe<OrderItemInput>> | Maybe<OrderItemInput>;
  totalPrice: Scalars['Int'];
}>;


export type UpdateCartMutation = (
  { __typename?: 'Mutation' }
  & { updateCart?: Maybe<(
    { __typename?: 'UpdateCart' }
    & { order?: Maybe<(
      { __typename?: 'OrderType' }
      & Pick<OrderType, 'totalPrice'>
      & { orderItems?: Maybe<(
        { __typename?: 'OrderItemTypeConnection' }
        & { edges?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemTypeEdge' }
          & { node?: Maybe<(
            { __typename?: 'OrderItemType' }
            & Pick<OrderItemType, 'id' | 'size' | 'quantity' | 'subTotalPrice'>
            & { item?: Maybe<(
              { __typename?: 'ItemType' }
              & Pick<ItemType, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
            )>, orderToppings?: Maybe<(
              { __typename?: 'OrderToppingTypeConnection' }
              & { edges?: Maybe<Array<Maybe<(
                { __typename?: 'OrderToppingTypeEdge' }
                & { node?: Maybe<(
                  { __typename?: 'OrderToppingType' }
                  & Pick<OrderToppingType, 'id'>
                  & { topping?: Maybe<(
                    { __typename?: 'ToppingType' }
                    & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
                  )> }
                )> }
              )>>> }
            )> }
          )> }
        )>>> }
      )> }
    )> }
  )> }
);

export type DeleteCartMutationVariables = Exact<{
  orderItemId: Scalars['ID'];
}>;


export type DeleteCartMutation = (
  { __typename?: 'Mutation' }
  & { deleteCart?: Maybe<(
    { __typename?: 'DeleteCart' }
    & { order?: Maybe<(
      { __typename?: 'OrderType' }
      & Pick<OrderType, 'totalPrice'>
      & { orderItems?: Maybe<(
        { __typename?: 'OrderItemTypeConnection' }
        & { edges?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemTypeEdge' }
          & { node?: Maybe<(
            { __typename?: 'OrderItemType' }
            & Pick<OrderItemType, 'id' | 'size' | 'quantity' | 'subTotalPrice'>
            & { item?: Maybe<(
              { __typename?: 'ItemType' }
              & Pick<ItemType, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
            )>, orderToppings?: Maybe<(
              { __typename?: 'OrderToppingTypeConnection' }
              & { edges?: Maybe<Array<Maybe<(
                { __typename?: 'OrderToppingTypeEdge' }
                & { node?: Maybe<(
                  { __typename?: 'OrderToppingType' }
                  & Pick<OrderToppingType, 'id'>
                  & { topping?: Maybe<(
                    { __typename?: 'ToppingType' }
                    & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
                  )> }
                )> }
              )>>> }
            )> }
          )> }
        )>>> }
      )> }
    )> }
  )> }
);

export type FetchToppingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchToppingsQuery = (
  { __typename?: 'Query' }
  & { toppings?: Maybe<(
    { __typename?: 'ToppingTypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'ToppingTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ToppingType' }
        & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
      )> }
    )>>> }
  )> }
);

export type FetchItemQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchItemQuery = (
  { __typename?: 'Query' }
  & { item?: Maybe<(
    { __typename?: 'ItemType' }
    & Pick<ItemType, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  input: UserSerializerMutationInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'UserSerializerMutationPayload' }
    & Pick<UserSerializerMutationPayload, 'id' | 'name' | 'email' | 'password' | 'zipcode' | 'address' | 'telephone' | 'status' | 'clientMutationId'>
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'field' | 'messages'>
    )>>> }
  )> }
);


export const FetchOrderItemsDocument = gql`
    query fetchOrderItems {
  cart {
    totalPrice
    orderItems {
      edges {
        node {
          id
          size
          quantity
          subTotalPrice
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
            edges {
              node {
                id
                topping {
                  id
                  name
                  priceM
                  priceL
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;


export const FetchOrderItemsDocument = gql`
    query fetchOrderItems {
  cart {
    totalPrice
    orderItems {
      edges {
        node {
          id
          size
          quantity
          subTotalPrice
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
            edges {
              node {
                id
                topping {
                  id
                  name
                  priceM
                  priceL
                }
              }
            }
          }
        }
      }
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
export const AddCartDocument = gql`
    mutation addCart($orderItem: OrderItemInput!, $totalPrice: Int!) {
  addCart(orderItem: $orderItem, status: 0, totalPrice: $totalPrice) {
    order {
      orderItems {
        edges {
          node {
            item {
              name
            }
            orderToppings {
              edges {
                node {
                  topping {
                    name
                  }
                }
              }
            }
            size
            quantity
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

export const OrderDocument = gql`
    mutation order($order: OrderInput!) {
  executeOrder(order: $order) {
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
    }
  }
}
`;
=======
export const UpdateCartDocument = gql`
    mutation updateCart($orderItems: [OrderItemInput]!, $totalPrice: Int!) {
  updateCart(orderItems: $orderItems, status: 0, totalPrice: $totalPrice) {
    order {
      totalPrice
      orderItems {
        edges {
          node {
            id
            size
            quantity
            subTotalPrice
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
              edges {
                node {
                  id
                  topping {
                    id
                    name
                    priceM
                    priceL
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export type UpdateCartMutationFn = Apollo.MutationFunction<UpdateCartMutation, UpdateCartMutationVariables>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      orderItems: // value for 'orderItems'
 *      totalPrice: // value for 'totalPrice'
 *   },
 * });
 */
export function useUpdateCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartMutation, UpdateCartMutationVariables>) {
        return Apollo.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument, baseOptions);
      }
export type UpdateCartMutationHookResult = ReturnType<typeof useUpdateCartMutation>;
export type UpdateCartMutationResult = Apollo.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = Apollo.BaseMutationOptions<UpdateCartMutation, UpdateCartMutationVariables>;
export const DeleteCartDocument = gql`
    mutation deleteCart($orderItemId: ID!) {
  deleteCart(orderItemId: $orderItemId) {
    order {
      totalPrice
      orderItems {
        edges {
          node {
            id
            size
            quantity
            subTotalPrice
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
              edges {
                node {
                  id
                  topping {
                    id
                    name
                    priceM
                    priceL
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

export type OrderMutationFn = Apollo.MutationFunction<OrderMutation, OrderMutationVariables>;

/**
 * __useOrderMutation__
 *
 * To run a mutation, you first call `useOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMutation` returns a tuple that includes:

export type DeleteCartMutationFn = Apollo.MutationFunction<DeleteCartMutation, DeleteCartMutationVariables>;

/**
 * __useDeleteCartMutation__
 *
 * To run a mutation, you first call `useDeleteCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartMutation` returns a tuple that includes:

 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example

 * const [orderMutation, { data, loading, error }] = useOrderMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useOrderMutation(baseOptions?: Apollo.MutationHookOptions<OrderMutation, OrderMutationVariables>) {
        return Apollo.useMutation<OrderMutation, OrderMutationVariables>(OrderDocument, baseOptions);
      }
export type OrderMutationHookResult = ReturnType<typeof useOrderMutation>;
export type OrderMutationResult = Apollo.MutationResult<OrderMutation>;
export type OrderMutationOptions = Apollo.BaseMutationOptions<OrderMutation, OrderMutationVariables>;

 * const [deleteCartMutation, { data, loading, error }] = useDeleteCartMutation({
 *   variables: {
 *      orderItemId: // value for 'orderItemId'
 *   },
 * });
 */
export function useDeleteCartMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCartMutation, DeleteCartMutationVariables>) {
        return Apollo.useMutation<DeleteCartMutation, DeleteCartMutationVariables>(DeleteCartDocument, baseOptions);
      }
export type DeleteCartMutationHookResult = ReturnType<typeof useDeleteCartMutation>;
export type DeleteCartMutationResult = Apollo.MutationResult<DeleteCartMutation>;
export type DeleteCartMutationOptions = Apollo.BaseMutationOptions<DeleteCartMutation, DeleteCartMutationVariables>;

export const FetchToppingsDocument = gql`
    query fetchToppings {
  toppings {
    edges {
      node {
        id
        name
        priceM
        priceL
      }
    }
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
    query fetchItem($id: ID!) {
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
export function useFetchItemQuery(baseOptions: Apollo.QueryHookOptions<FetchItemQuery, FetchItemQueryVariables>) {
        return Apollo.useQuery<FetchItemQuery, FetchItemQueryVariables>(FetchItemDocument, baseOptions);
      }
export function useFetchItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemQuery, FetchItemQueryVariables>) {
          return Apollo.useLazyQuery<FetchItemQuery, FetchItemQueryVariables>(FetchItemDocument, baseOptions);
        }
export type FetchItemQueryHookResult = ReturnType<typeof useFetchItemQuery>;
export type FetchItemLazyQueryHookResult = ReturnType<typeof useFetchItemLazyQuery>;
export type FetchItemQueryResult = Apollo.QueryResult<FetchItemQuery, FetchItemQueryVariables>;
export const RegisterDocument = gql`
    mutation register($input: UserSerializerMutationInput!) {
  registerUser(input: $input) {
    id
    name
    email
    password
    zipcode
    address
    telephone
    status
    errors {
      field
      messages
    }
    clientMutationId
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;