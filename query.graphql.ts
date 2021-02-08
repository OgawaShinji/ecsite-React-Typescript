import gql from "graphql-tag";
//本番環境用query
// ============================ order  ====================================================================

gql(`query fetchOrderItems {
  cart {
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
`)

gql(`
mutation addCart($orderItem:OrderItemInput!,$totalPrice:Int!){
  addCart(orderItem:$orderItem,status:0,totalPrice:$totalPrice){
    order{
      orderItems{
        edges{
          node{
            item{
              name
            }
            orderToppings{
              edges{
                node{
                  topping{
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
`)

gql(`
mutation updateCart($orderItems: [OrderItemInput]!,$totalPrice:Int!) {
   updateCart(
    orderItems: $orderItems
    status: 0
    totalPrice:$totalPrice
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


// ============================= topping ====================================================================
gql(`
query fetchToppings{
  toppings{
    edges{
      node{
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
query fetchItem($id:ID!){
  item(id:$id){
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
// ============================ user ============================================================================

