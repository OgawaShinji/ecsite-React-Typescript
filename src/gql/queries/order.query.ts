import gql from "graphql-tag";

gql(`query fetchOrderItems{
  cart{
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

gql(`mutation updateOrderItem($orderItemInput: OrderItemInput!,$totalPrice:TotalPrice) {
   updateOrderItem(
    orderItemInput: $orderItemInput
    status: 0
    totalPrice:$totalPrice
  ){
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
}`)

gql(`mutation deleteOrder($deleteOrderItemId: DeleteOrderItemId!) {
   deleteOrderItem(
    deleteOrderItemId:$deleteOrderItemId
  ){
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
}`)