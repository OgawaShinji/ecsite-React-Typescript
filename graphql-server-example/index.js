const {GraphQLScalarType, Kind} = require('graphql');
const {ApolloServer, gql} = require('apollo-server');

// customScalar
// date型を作成
const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});


// graphQLで管理するデータ型とクエリを管理
const typeDefs = gql`
  # カスタムスカラーの定義
  scalar Date

  # データ型の定義  
  type User{
    id: Int
    name: String
    email: String
    zipcode: String
    address: String
    telephone: String
    status: Int
    password: String
  }
  
  type Item{
    id: Int
    name: String
    description: String
    priceM: Int
    priceL: Int
    imagePath: String
    deleted: Int
  }
  
  type Topping{
    id: Int
    name: String
    priceM: Int
    priceL: Int
  }
  
  type OrderItem{
    id: Int
    item: Item
    orderToppings: [OrderTopping]
    quantity: Int
    size: String
    subTotalPrice: Int
  }
  
  type OrderTopping{
    id: Int
    topping: Topping
  }
  
  type Order{
    id: Int
    user: User
    status: Int
    orderDate: String
    deliveryTime: Date
    destinationName: String
    destinationEmail: String
    destinationZipcode: String
    destinationAddress: String
    destinationTel: String
    paymentMethod: String
    totalPrice: Int
    orderItems: [OrderItem]
}

  type SearchForm {
    itemName: String
    sortId: Int
}
  
  # 引数に入れるオブジェクトの型を定義
  input UserInfo {
        name: String!
        email: String!
        zipcode: String!
        address: String!
        telephone: String!
        password: String!
  }
  
  input OrderInfo {
        status: Int
        orderDate: String
        deliveryTime: Date
        destinationName: String
        destinationEmail: String
        destinationZipcode: String
        destinationAddress: String
        destinationTel: String
        paymentMethod: String
        totalPrice: Int
  }

input UpTopping{
    topping: Int
}
 
 input UpOrderItem{
      id: Int,
      item: Int,
      orderToppings: [UpTopping]
      size: String
      quantity: Int
 }
 
 input OrderItemInput{
      orderItems: [UpOrderItem]
 }
 
 input TotalPrice{
    totalPrice: Int
 }
 
 input DeleteOrderItemId{
    orderItemId: Int
 }
 
  # ここに書いたオブジェクトたちをqueryで持ってくることができる
  type Query {
    cart: Order
    users: [User]
    toppings: [Topping]
  }
  
  type Mutation{
  
     postUser(userInfo: UserInfo!): User
     
     updateOrderInfo(orderInfo: OrderInfo!): Order
     
     update(
        id: Int!
        name: String
        email: String
    ): [User]

    updateOrderItem(
        orderItemInput: OrderItemInput!
        status: Int
        totalPrice: TotalPrice
    ):Order
    
    deleteOrderItem(
        deleteOrderItemId: DeleteOrderItemId!
    ):Order
  }
`;

// 初期値として入れておきたい値を設定してください

const toppings=[
    {
        id: 1,
        name: "フレッシュモッツァレラチーズ",
        priceM: 20,
        priceL: 50
    },{
        id: 2,
        name: "topping 2",
        priceM: 15,
        priceL: 30
    },
    {
        id: 3,
        name: "topping 3",
        priceM: 25,
        priceL: 35
    },
    {
        id: 4,
        name: "topping 4",
        priceM: 25,
        priceL: 35
    },
    {
        id: 5,
        name: "topping 5",
        priceM: 25,
        priceL: 35
    },
]

const cart = {
    id: 1,
    status: 0,
    orderDate: null,
    deliveryTime: null,
    destinationName: "Raku",
    destinationEmail: "raku@raku.co.jp",
    destinationZipcode: "123-4567",
    destinationAddress: "tokyo",
    destinationTel: "000-1111-2222",
    paymentMethod: "1",
    totalPrice: 1000,
    user:{
        id: 1,
        name:"yama",
        email:"ko@gmail.com",
        password:"123456",
        zipcode:"000-1111",
        address:"tokyo",
        telephone:"000-1111-2222",
        status:0
    },
    orderItems: [
        {
            id: 1,
            item: {
                id: 1,
                name: "apple",
                description: "good",
                priceM: 300,
                priceL: 400,
                imagePath: "http://34.84.118.239/static/img/item/3.jpg",
                deleted: 0
            },
            orderToppings: [
                {
                    id: 13,
                    topping: {
                        id: 13,
                        name: "topping 13",
                        priceM: 25,
                        priceL: 35
                    },
                    orderItem: 1
                },
                {
                    id: 2,
                    topping: {
                        id: 2,
                        name: "topping 2",
                        priceM: 15,
                        priceL: 30
                    },
                    orderItem: 1
                }
            ],
            quantity: 3,
            size: "M",
            subTotalPrice: 600
        }
    ]
}


// ダミーデータ
const users = []


// GraphQL の operation（query や mutation や subscription）が、実際にどのような処理を行なってデータを返すのかという指示書

const resolvers = {
    Date: dateScalar,
    Query: {
        // この中で引数に設定した値をもとにfilterをかけることができる
        cart: () => cart,
        toppings:()=>toppings,
        users: () => users
    },
    Mutation: {
        postUser(parent, args, context, info) {
            //引数に渡されたデータを確認
            console.log(args)
            const user = {
                id: Math.floor(Math.random() * 100),
                status: 1,
                ...args.userInfo
            }
            users.push(user)
            //登録したユーザー情報が返ってくる
            return user
        },
        update(parent, args) {
            //ユーザーリストから対象ユーザーをidで特定する
            const index = users.findIndex(({id}) => id === Number(args.id));
            //対象ユーザーの情報を更新
            users[index].name = args.name
            users[index].email = args.email
            return users
        },
        updateOrderItem(parent,args){
            console.log(args.orderItemInput.orderItems)
            console.log(args.totalPrice.totalPrice)
            return cart
        },
        deleteOrderItem(parent,args) {
            console.log(args)
            return cart
        },
        //今回は初期値にセットしてある内容を更新する
        updateOrderInfo(parent, args, context, info){
            //引数に渡されたデータを確認
            console.log(args)
            cart.status = args.orderInfo.status
            cart.paymentMethod = args.orderInfo.paymentMethod
            cart.orderDate = args.orderInfo.orderDate
            cart.deliveryTime = args.orderInfo.deliveryTime
            cart.destinationName = args.orderInfo.destinationName
            cart.destinationEmail = args.orderInfo.destinationEmail
            cart.destinationZipcode = args.orderInfo.destinationZipcode
            cart.destinationAddress = args.orderInfo.destinationAddress
            cart.destinationTel = args.orderInfo.destinationTel
            cart.totalPrice = args.orderInfo.totalPrice
            return cart
        }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});