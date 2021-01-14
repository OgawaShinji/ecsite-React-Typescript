export interface User {
    userId: number
    userName: string
    email: string
    zipcode: string
    address: string
    telephone: string
    status: number
    password?: string
}

export interface Item {
    itemId: number
    name: string
    imagePath: string
    priceM: number
    priceL: number
    description?: string
}

export interface Topping {
    id: number
    name: string
    priceM?: number
    priceL?: number
}

export interface Order {
    orderId?: number
    totalPrice?: number
    destinationAddress?: string
    destinationName?: string
    // 日付のみ
    orderDate?: Date
    // 時間まで
    deliveryTime?: Date
    status?: number
    orderItems: Array<OrderItem>
    destinationZipcode?: string
    paymentMethod?: string
}

export interface OrderItem {
    itemId: number
    name: string
    price: number
    size: string
    orderToppingList?: Array<Topping>
    quantity: number
    subTotalPrice?: number
}

export interface OrderTopping {
    orderToppingId?: number
    toppingId?: number
    orderItemId: number
    topping: Topping
}

export interface SearchForm {
    itemName: string
    sortId: number
}