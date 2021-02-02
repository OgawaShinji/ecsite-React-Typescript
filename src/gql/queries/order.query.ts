import gql from "graphql-tag";

gql(`
query fetchOrderItems{
  order{
    orderItems{
      ...OrderItemFrag
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
  orderItemId
}

fragment ToppingFrag on Topping {
  id
  name
  priceM
  priceL
}
`)

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