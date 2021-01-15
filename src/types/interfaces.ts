export interface User {
    id: number
    name: string
    email: string
    zipcode: string
    address: string
    telephone: string
    status: number
    password?: string
}

export interface Item {
    id: number;
    name: string;
    description: string;
    priceM: number;
    priceL: number;
    imagePath: string;
    deleted: number;
}

export interface Topping {
    id: number;
    name: string;
    priceM?: number;
    priceL?: number;
}

export interface Order {
    id?: number
    user?: User
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
    id?: number;
    topping: Topping;
}

export interface SearchForm {
    itemName: string;
    sortId: number;
}

export interface DisplaySetting {
    displayCount: number;
    pageNum: number;
}