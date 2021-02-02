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
        orderItemId
      }
      quantity
      size
      subTotalPrice
    }
  }
}
    

`)