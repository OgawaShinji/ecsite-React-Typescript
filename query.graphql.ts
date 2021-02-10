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
mutation addCart($orderItem:OrderItemInput!){
  addCart(orderItem:$orderItem,status:0){
     order{
      id
     }   
  }
}
`)

gql(`
mutation updateCart($orderItems: [OrderItemInput]!) {
   updateCart(
    orderItems: $orderItems
    status: 0
  ){
    order {
    totalPrice
    orderItems{
      edges{
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
            }
          }
        }
      }
    }
  }
  }
}`)

gql(`
mutation deleteCart($orderItemId:ID!) {
   deleteCart(
    orderItemId:$orderItemId
  ){
    order {
    totalPrice
    orderItems{
      edges{
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
            }
          }
        }
      }
    }
  }
  }
}`)

gql(`
mutation order($order: OrderInput!){
  executeOrder(order:$order){
    order{
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
`)

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
    query fetchItemsTotalCount {
      items {
        totalCount
      }
    }
`)

// ============================ user ============================================================================

gql(`
    query fetchUser{
      user{
        name
        email
        zipcode
        address
        telephone
        id
      }
    }
`)

gql(`
mutation register($userData: UserRegisterInput!){
  registerUser(userData: $userData){
    user{
        name
        email
        zipcode
        address
        telephone
        id
    }
  }
}
`)

// ============================ history ============================================================================

gql(`
    query fetchOrderHistory($first: Int, $after: String, $last: Int, $before: String) {
      orderHistory(first: $first, after: $after, last: $last, before: $before, orderBy: "-orderDate,-id") {
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
