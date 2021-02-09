import gql from "graphql-tag";
//本番環境用query
// ============================ order  ====================================================================

gql(`query fetchOrderItems {
  cart {
    id
    totalPrice
    orderItems{
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
      edges{
        cursor
        node{
          id
          size
          quantity
          subTotalPrice
          item{
            id
            name
            description
            priceM
            priceL
            imagePath
            deleted
          }
          orderToppings{
            pageInfo{
            hasNextPage
            hasPreviousPage
            }
            edges{
              cursor
              node{
                id
                topping{
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
`)

gql(`
mutation addCart($orderItem:OrderItemInput!,$totalPrice:Int!){
  addCart(orderItem:$orderItem,status:0,totalPrice:$totalPrice){
     order{
      id
     }   
  }
}
`)

gql(`
mutation updateCart($orderItems: [OrderItemInput]!,$totalPrice:Int!) {
   updateCart(
    orderItems: $orderItems
    status: 0
    totalPrice:$totalPrice
  ){
    order {
        id
    }
  }
}`)

gql(`
mutation deleteCart($orderItemId:ID!) {
   deleteCart(
   orderItemId:$orderItemId
  ){
    order {
        id
    }
  }
}`)

// ============================= topping ====================================================================

gql(`
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
`)

// ============================= item ====================================================================

gql(`
    query fetchItem($id: ID!){
      item(id: $id){
        id
        name
        description
        priceM
        priceL
        imagePath
        deleted
      }
    }
`)

gql(`
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
`)

gql(`
    query fetchItemNames {
      items {
        edges {
          node {
            name
          }
        }
      }
    }
`)

gql(`
    query fetchItemsTotalCount {
      items {
        totalCount
      }
    }
`)

// ============================ user ============================================================================

gql(`
query fetchUser {
  user{
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
    orderSet{
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
      edges{
        cursor
      }
    }
  }
}
`)

// ============================ history ============================================================================

gql(`
    query fetchOrderHistory($limit: Int, $offset: Int) {
      orderHistory(first: $limit, offset: $offset, orderBy: "-orderDate,-id") {
        pageInfo{
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
            orderItems{
              pageInfo{
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
              edges{
                node{
                  id
                  item{
                    id
                    name
                    description
                    imagePath
                    priceM
                    priceL
                    deleted
                  }
                  orderToppings{
                    pageInfo{
                      hasPreviousPage
                      hasNextPage
                      startCursor
                      endCursor
                    }
                    edges{
                      node{
                        id
                        topping{
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
`)
