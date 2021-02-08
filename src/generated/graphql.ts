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
  toppings?: Maybe<ToppingTypeConnection>;
  user?: Maybe<UserType>;
  registerUser?: Maybe<UserType>;
  orderHistory?: Maybe<OrderHistoryTypeConnection>;
  cart?: Maybe<OrderType>;
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


export type QueryToppingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name_Icontains?: Maybe<Scalars['String']>;
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
  totalCount?: Maybe<Scalars['Int']>;
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
  orderItems: OrderItemTypeConnection;
};


export type ItemTypeOrderItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type OrderItemTypeConnection = {
  __typename?: 'OrderItemTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderItemTypeEdge>>;
};

/** A Relay edge containing a `OrderItemType` and its cursor. */
export type OrderItemTypeEdge = {
  __typename?: 'OrderItemTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderItemType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrderItemType = Node & {
  __typename?: 'OrderItemType';
  /** The ID of the object. */
  id: Scalars['ID'];
  item: ItemType;
  order: OrderType;
  quantity: Scalars['Int'];
  size: Scalars['String'];
  orderToppings: OrderToppingTypeConnection;
  subTotalPrice?: Maybe<Scalars['Int']>;
};


export type OrderItemTypeOrderToppingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type OrderType = Node & {
  __typename?: 'OrderType';
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
  orderItems: OrderItemTypeConnection;
};


export type OrderTypeOrderItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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
  orderSet: OrderTypeConnection;
};


export type UserTypeOrderSetArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type OrderTypeConnection = {
  __typename?: 'OrderTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderTypeEdge>>;
};

/** A Relay edge containing a `OrderType` and its cursor. */
export type OrderTypeEdge = {
  __typename?: 'OrderTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type OrderToppingTypeConnection = {
  __typename?: 'OrderToppingTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderToppingTypeEdge>>;
};

/** A Relay edge containing a `OrderToppingType` and its cursor. */
export type OrderToppingTypeEdge = {
  __typename?: 'OrderToppingTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrderToppingType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrderToppingType = Node & {
  __typename?: 'OrderToppingType';
  /** The ID of the object. */
  id: Scalars['ID'];
  topping: ToppingType;
  orderItem: OrderItemType;
};

export type ToppingType = Node & {
  __typename?: 'ToppingType';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  priceM: Scalars['Int'];
  priceL: Scalars['Int'];
  orderToppings: OrderToppingTypeConnection;
};


export type ToppingTypeOrderToppingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ToppingTypeConnection = {
  __typename?: 'ToppingTypeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ToppingTypeEdge>>;
};

/** A Relay edge containing a `ToppingType` and its cursor. */
export type ToppingTypeEdge = {
  __typename?: 'ToppingTypeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ToppingType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
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

/** ログイン中のユーザーの注文履歴を取得 */
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
  orderItems: OrderItemTypeConnection;
};


/** ログイン中のユーザーの注文履歴を取得 */
export type OrderHistoryTypeOrderItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserSerializerMutationPayload>;
  addCart?: Maybe<AddCart>;
  updateCart?: Maybe<UpdateCart>;
  deleteCart?: Maybe<DeleteCart>;
  executeOrder?: Maybe<ExecuteOrder>;
};


export type MutationRegisterUserArgs = {
  input: UserSerializerMutationInput;
};


export type MutationAddCartArgs = {
  orderItem: OrderItemInput;
  status: Scalars['Int'];
  totalPrice: Scalars['Int'];
};


export type MutationUpdateCartArgs = {
  orderItems: Array<Maybe<OrderItemInput>>;
  status: Scalars['Int'];
  totalPrice: Scalars['Int'];
};


export type MutationDeleteCartArgs = {
  orderItemId: Scalars['ID'];
};


export type MutationExecuteOrderArgs = {
  order: OrderInput;
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

export type AddCart = {
  __typename?: 'AddCart';
  order?: Maybe<OrderType>;
};

export type OrderItemInput = {
  id: Scalars['ID'];
  item: Scalars['ID'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
  orderToppings: Array<Maybe<OrderToppingInput>>;
};

export type OrderToppingInput = {
  topping?: Maybe<Scalars['ID']>;
};

export type UpdateCart = {
  __typename?: 'UpdateCart';
  order?: Maybe<OrderType>;
};

export type DeleteCart = {
  __typename?: 'DeleteCart';
  order?: Maybe<OrderType>;
};

export type ExecuteOrder = {
  __typename?: 'ExecuteOrder';
  order?: Maybe<OrderType>;
};

export type OrderInput = {
  status: Scalars['Int'];
  orderDate: Scalars['Date'];
  destinationName: Scalars['String'];
  destinationAddress: Scalars['String'];
  destinationZipcode: Scalars['String'];
  destinationEmail: Scalars['String'];
  destinationTel: Scalars['String'];
  deliveryTime: Scalars['DateTime'];
  paymentMethod: Scalars['Int'];
};

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
      & { orderItems: (
        { __typename?: 'OrderItemTypeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'OrderItemTypeEdge' }
          & { node?: Maybe<(
            { __typename?: 'OrderItemType' }
            & Pick<OrderItemType, 'size' | 'quantity'>
            & { item: (
              { __typename?: 'ItemType' }
              & Pick<ItemType, 'name'>
            ), orderToppings: (
              { __typename?: 'OrderToppingTypeConnection' }
              & { edges: Array<Maybe<(
                { __typename?: 'OrderToppingTypeEdge' }
                & { node?: Maybe<(
                  { __typename?: 'OrderToppingType' }
                  & { topping: (
                    { __typename?: 'ToppingType' }
                    & Pick<ToppingType, 'name'>
                  ) }
                )> }
              )>> }
            ) }
          )> }
        )>> }
      ) }
    )> }
  )> }
);

export type FetchToppingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchToppingsQuery = (
  { __typename?: 'Query' }
  & { toppings?: Maybe<(
    { __typename?: 'ToppingTypeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ToppingTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ToppingType' }
        & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
      )> }
    )>> }
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

export type FetchItemsQueryVariables = Exact<{
  sort?: Maybe<Scalars['String']>;
  itemName?: Maybe<Scalars['String']>;
}>;


export type FetchItemsQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<(
    { __typename?: 'ItemTypeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ItemTypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ItemType' }
        & Pick<ItemType, 'id' | 'name' | 'description' | 'imagePath' | 'priceM' | 'priceL' | 'deleted'>
      )> }
    )>> }
  )> }
);

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

export type FetchItemsTotalCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchItemsTotalCountQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<(
    { __typename?: 'ItemTypeConnection' }
    & Pick<ItemTypeConnection, 'totalCount'>
  )> }
);

export type FetchOrderHistoryQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type FetchOrderHistoryQuery = (
  { __typename?: 'Query' }
  & { orderHistory?: Maybe<(
    { __typename?: 'OrderHistoryTypeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'OrderHistoryTypeEdge' }
      & Pick<OrderHistoryTypeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'OrderHistoryType' }
        & Pick<OrderHistoryType, 'id' | 'totalPrice' | 'orderDate' | 'destinationName' | 'destinationEmail' | 'destinationZipcode' | 'destinationAddress' | 'destinationTel' | 'deliveryTime' | 'paymentMethod' | 'status'>
        & { orderItems: (
          { __typename?: 'OrderItemTypeConnection' }
          & { pageInfo: (
            { __typename?: 'PageInfo' }
            & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'>
          ), edges: Array<Maybe<(
            { __typename?: 'OrderItemTypeEdge' }
            & Pick<OrderItemTypeEdge, 'cursor'>
            & { node?: Maybe<(
              { __typename?: 'OrderItemType' }
              & Pick<OrderItemType, 'id' | 'quantity' | 'size' | 'subTotalPrice'>
              & { item: (
                { __typename?: 'ItemType' }
                & Pick<ItemType, 'id' | 'name' | 'description' | 'imagePath' | 'priceM' | 'priceL' | 'deleted'>
              ), orderToppings: (
                { __typename?: 'OrderToppingTypeConnection' }
                & { pageInfo: (
                  { __typename?: 'PageInfo' }
                  & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'>
                ), edges: Array<Maybe<(
                  { __typename?: 'OrderToppingTypeEdge' }
                  & Pick<OrderToppingTypeEdge, 'cursor'>
                  & { node?: Maybe<(
                    { __typename?: 'OrderToppingType' }
                    & Pick<OrderToppingType, 'id'>
                    & { topping: (
                      { __typename?: 'ToppingType' }
                      & Pick<ToppingType, 'id' | 'name' | 'priceM' | 'priceL'>
                    ) }
                  )> }
                )>> }
              ) }
            )> }
          )>> }
        ) }
      )> }
    )>> }
  )> }
);


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
export const FetchItemsDocument = gql`
    query fetchItems($sort: String, $itemName: String) {
  items(name_Icontains: $itemName, orderBy: $sort) {
    edges {
      node {
        id
        name
        description
        imagePath
        priceM
        priceL
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
 *      sort: // value for 'sort'
 *      itemName: // value for 'itemName'
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
export const FetchItemsTotalCountDocument = gql`
    query fetchItemsTotalCount {
  items {
    totalCount
  }
}
    `;

/**
 * __useFetchItemsTotalCountQuery__
 *
 * To run a query within a React component, call `useFetchItemsTotalCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchItemsTotalCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchItemsTotalCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchItemsTotalCountQuery(baseOptions?: Apollo.QueryHookOptions<FetchItemsTotalCountQuery, FetchItemsTotalCountQueryVariables>) {
        return Apollo.useQuery<FetchItemsTotalCountQuery, FetchItemsTotalCountQueryVariables>(FetchItemsTotalCountDocument, baseOptions);
      }
export function useFetchItemsTotalCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchItemsTotalCountQuery, FetchItemsTotalCountQueryVariables>) {
          return Apollo.useLazyQuery<FetchItemsTotalCountQuery, FetchItemsTotalCountQueryVariables>(FetchItemsTotalCountDocument, baseOptions);
        }
export type FetchItemsTotalCountQueryHookResult = ReturnType<typeof useFetchItemsTotalCountQuery>;
export type FetchItemsTotalCountLazyQueryHookResult = ReturnType<typeof useFetchItemsTotalCountLazyQuery>;
export type FetchItemsTotalCountQueryResult = Apollo.QueryResult<FetchItemsTotalCountQuery, FetchItemsTotalCountQueryVariables>;
export const FetchOrderHistoryDocument = gql`
    query fetchOrderHistory($limit: Int, $offset: Int) {
  orderHistory(first: $limit, offset: $offset, orderBy: "-orderDate,-id") {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        totalPrice
        orderDate
        destinationName
        destinationEmail
        destinationZipcode
        destinationAddress
        destinationTel
        deliveryTime
        paymentMethod
        status
        orderItems {
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              item {
                id
                name
                description
                imagePath
                priceM
                priceL
                deleted
              }
              orderToppings {
                pageInfo {
                  hasPreviousPage
                  hasNextPage
                  startCursor
                  endCursor
                }
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
                  cursor
                }
              }
              quantity
              size
              subTotalPrice
            }
            cursor
          }
        }
      }
      cursor
    }
  }
}
    `;

/**
 * __useFetchOrderHistoryQuery__
 *
 * To run a query within a React component, call `useFetchOrderHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrderHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrderHistoryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFetchOrderHistoryQuery(baseOptions?: Apollo.QueryHookOptions<FetchOrderHistoryQuery, FetchOrderHistoryQueryVariables>) {
        return Apollo.useQuery<FetchOrderHistoryQuery, FetchOrderHistoryQueryVariables>(FetchOrderHistoryDocument, baseOptions);
      }
export function useFetchOrderHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOrderHistoryQuery, FetchOrderHistoryQueryVariables>) {
          return Apollo.useLazyQuery<FetchOrderHistoryQuery, FetchOrderHistoryQueryVariables>(FetchOrderHistoryDocument, baseOptions);
        }
export type FetchOrderHistoryQueryHookResult = ReturnType<typeof useFetchOrderHistoryQuery>;
export type FetchOrderHistoryLazyQueryHookResult = ReturnType<typeof useFetchOrderHistoryLazyQuery>;
export type FetchOrderHistoryQueryResult = Apollo.QueryResult<FetchOrderHistoryQuery, FetchOrderHistoryQueryVariables>;