import gql from "graphql-tag";

// ============================ order  ====================================================================

gql(`query fetchOrderItems {
  cart {
    orderItems {
      ...OrderItemFrag
      quantity
      size
      subTotalPrice
    }
    totalPrice
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
gql(`mutation deleteOrderItem($deleteOrderItemId: DeleteOrderItemId!) {
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
gql(`mutation addCart($orderItem:UpOrderItem!,$totalPrice:Int!){
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
}`)

// ============================= topping ====================================================================

gql(`query fetchToppings{
  toppings{
    id
    name
    priceM
    priceL
  }
}`)

// ============================= item ====================================================================

gql(`query fetchItem($id:Int){
  item(id:$id){
    id
    name
    description
    priceM
    priceL
    imagePath
    deleted
  }
}`)

// ============================ user ============================================================================

const postRegister = gql(`mutation postRegister($userInfo: UserInfo!) {
   postUser(userInfo: $userInfo){
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
`)

const fetchUser = gql(`query listUser {
   users {
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
`)