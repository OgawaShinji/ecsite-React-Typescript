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
  id?: Maybe<Scalars['ID']>;
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
  deleted?: Maybe<Scalars['Boolean']>;
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
};

export type Order = {
  __typename?: 'Order';
  id?: Maybe<Scalars['ID']>;
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

export type NodeItems = {
  __typename?: 'nodeItems';
  node?: Maybe<Item>;
  cursor?: Maybe<Scalars['String']>;
};

export type ReturnItems = {
  __typename?: 'ReturnItems';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<NodeItems>>>;
};

export type NodeToppings = {
  __typename?: 'nodeToppings';
  node?: Maybe<Topping>;
  cursor?: Maybe<Scalars['String']>;
};

export type ReturnToppings = {
  __typename?: 'ReturnToppings';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<NodeToppings>>>;
};

export type NodeHistory = {
  __typename?: 'nodeHistory';
  node?: Maybe<Order>;
  cursor?: Maybe<Scalars['String']>;
};

export type ReturnHistory = {
  __typename?: 'ReturnHistory';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<NodeHistory>>>;
};

export type ReturnOrder = {
  __typename?: 'ReturnOrder';
  order?: Maybe<Order>;
  cursor?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  toppings?: Maybe<ReturnToppings>;
  item?: Maybe<Item>;
  items?: Maybe<ReturnItems>;
  cart?: Maybe<Order>;
  orderHistory?: Maybe<ReturnHistory>;
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
  addCart?: Maybe<ReturnOrder>;
};


export type MutationAddCartArgs = {
  orderItem: OrderItemInput;
  status?: Maybe<Scalars['Int']>;
  totalPrice: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AddCartMutationVariables = Exact<{
  orderItem: OrderItemInput;
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
  & { toppings?: Maybe<(
    { __typename?: 'ReturnToppings' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'nodeToppings' }
      & { node?: Maybe<(
        { __typename?: 'Topping' }
        & Pick<Topping, 'id' | 'name' | 'priceM' | 'priceL'>
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
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'description' | 'priceM' | 'priceL' | 'imagePath' | 'deleted'>
  )> }
);


export const AddCartDocument = gql`
    mutation addCart($orderItem: OrderItemInput!, $totalPrice: Int!) {
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