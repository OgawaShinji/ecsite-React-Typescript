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
    toppingId: number
    name: string
    priceM?: number
    priceL?: number
}

export interface Order {
    id?: number
    status?: number
    // 日付のみ
    orderDate?: Date
    // 時間まで
    deliveryTime?: Date
    destinationName?: string
    destinationEmail?: string
    destinationZipcode?: string
    destinationAddress?: string
    destinationTel?: string
    paymentMethod?: string
    totalPrice?: number
    orderItems?: Array<OrderItem>
}

export interface OrderItem {
    id: number
    item: Item
    orderToppings?: Array<OrderTopping>
    quantity: number
    size: string
    subTotalPrice?: number
}

export interface OrderTopping {
    id?: number
    topping: Topping
    quantity: number
    size: string
}

export interface SearchForm {
    searchKey: string
    sortId: number
}