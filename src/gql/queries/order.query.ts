import gql from "graphql-tag";

gql(`query fetchOrderItems{
  order{
    orderItems{
      id
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
        id
        topping{
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
}`)