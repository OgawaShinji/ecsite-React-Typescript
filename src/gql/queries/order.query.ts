import gql from "graphql-tag";
gql(`query fetchOrderItems {
  cart {
    orderItems {
      ...OrderItemFrag
      quantity
      size
      subTotalPrice
    }
  }
}
fragment OrderItemFrag on OrderItem {     
        id
        item{
          ...ItemFrag
        }
        orderToppings{
          ...OrderToppingFrag
        }
        quantity
        size
        subTotalPrice 
}
fragment ItemFrag on Item {
  id
  name
  description
  priceM
  priceL
  imagePath
  deleted
}

fragment OrderToppingFrag on OrderTopping {
  id
  topping{
    ...ToppingFrag
  }
}

fragment ToppingFrag on Topping {
  id
  name
  priceM
  priceL
}
`)
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
      }
      quantity
      size
      subTotalPrice
    }
  }
}`)
const postOrder = gql(`mutation updateOrder($orderInfo: OrderInfo!) {
    updateOrderInfo(orderInfo: $orderInfo ){
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
`)
const fetchOrder = gql(` query fetchOrder{
  cart{
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
    orderItems{
      id
      item{
        name
        description
        priceM
      }
      orderToppings{
        id
        topping{
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
`)
