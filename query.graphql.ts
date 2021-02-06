import gql from "graphql-tag";
//本番環境用query
// ============================ order  ====================================================================
gql(`
mutation addCart($orderItem:OrderItemInput!,$totalPrice:Int!){
  addCart(orderItem:$orderItem,status:0,totalPrice:$totalPrice){
    order{
      orderItems{
        item{
          name
        }
        orderToppings{
          topping{
            name
          }
        }
      }
      status
      totalPrice
    }  
  }
}
`)


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

