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
  type UserType{
    id: ID
    name: String
    email: String
    zipcode: String
    address: String
    telephone: String
    status: Int
    password: String
    orderSet: OrderHistoryTypeConnection
  }
  
  type ItemType{
    id: ID
    name: String
    description: String
    priceM: Int
    priceL: Int
    imagePath: String
    deleted: Boolean
  }
  
  type ToppingType{
    id: ID
    name: String
    priceM: Int
    priceL: Int
  }
  
  type OrderItemType{
    id: ID
    item: ItemType
    orderToppings: OrderToppingTypeConnection
    quantity: Int
    size: String
    subTotalPrice: Int
  }
  
  type OrderToppingType{
    id: ID
    topping: ToppingType
    orderItem:OrderItemType
  }
  
  type OrderType{
    id: ID
    user: UserType
    status: Int
    orderDate: String
    deliveryTime: Date
    destinationName: String
    destinationEmail: String
    destinationZipcode: String
    destinationAddress: String
    destinationTel: String
    paymentMethod: Int
    totalPrice: Int
    orderItems: OrderItemTypeConnection
}

type OrderHistoryType{
    id: ID
    user: UserType
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
    orderItems: OrderItemTypeConnection
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

input OrderToppingInput{
    topping: ID
}
 
 input OrderItemInput{
      id: ID,
      item: ID,
      orderToppings: [OrderToppingInput]!
      size: String
      quantity: Int
 }
 
 input TotalPrice{
    totalPrice: Int
 }
 
 input DeleteOrderItemId{
    orderItemId: Int
 }
 
 # サーバーサイドの仕様上必要な型
  type ItemTypeConnection{
    pageInfo:PageInfo
    edges:[ItemTypeEdge]
  }
  type ItemTypeEdge{
    node:ItemType
    cursor:String
  }
  type ToppingTypeConnection{
    pageInfo:PageInfo
    edges:[ToppingTypeEdge]
  }
  type ToppingTypeEdge{
    node:ToppingType
    cursor:String
  }
  type OrderHistoryTypeConnection{
    pageInfo:PageInfo
    edges:[OrderHistoryTypeEdge]
  }
  type OrderHistoryTypeEdge{
    node:OrderHistoryType
    cursor:String
  }
  type OrderItemTypeConnection{
    pageInfo:PageInfo
    edges:[OrderItemTypeEdge]
  }
  type OrderItemTypeEdge{
    node:OrderItemType
    cursor:String
  }
  type OrderToppingTypeConnection{
    pageInfo:PageInfo
    edges:[OrderToppingTypeEdge]
  }
  type OrderToppingTypeEdge{
    node:OrderToppingType
    cursor:String
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type AddCart{
    order:OrderType
  }
  
  type UpdateCart{
    order:OrderType
  }
  
  type DeleteCart{
    order:OrderType
  }
 
  # ここに書いたオブジェクトたちをqueryで持ってくることができる
  type Query {
    user: UserType
    toppings(
        offset: Int
        before: String
        after: String
        first: Int
        last: Int
        name_Icontains: String
    ): ToppingTypeConnection
    item(id: ID):ItemType
    items(
        offset: Int
        before: String
        after: String
        first: Int
        last: Int
        name_Icontains: String
        orderBy: String
    ): ItemTypeConnection
    cart: OrderType
    orderHistory(
        offset: Int
        before: String
        after: String
        first: Int
        last: Int
        name_Icontains: String
    ): OrderHistoryTypeConnection
  }
  
  type Mutation{
     addCart(orderItem:OrderItemInput!,status:Int,totalPrice:Int!): AddCart
     updateCart(orderItems:[OrderItemInput]!,status:Int!,totalPrice:Int!):UpdateCart
     deleteCart(orderItemId:ID!):DeleteCart
  }
`;

// 初期値として入れておきたい値を設定してください
const items = [
    {
        deleted: false,
        description: "ホクホクのポテトと旨味が凝縮されたベーコンを特製マヨソースで味わって頂く商品です。バター風味豊かなキューブチーズが食材の味を一層引き立てます。",
        id: "SXRlbVR5cGU6MTQ=",
        imagePath: "http://34.84.118.239/static/img/item/1.jpg",
        name: "じゃがバターベーコン",
        priceL: 2570,
        priceM: 1490
    },
    {
        deleted: 0,
        description: "グリーンアスパラと相性の良いベーコンにいろどりのフレッシュトマトをトッピングし特製マヨソースでまとめた商品です",
        id: "SXRlbVR5cGU6Mg==",
        imagePath: "http://34.84.118.239/static/img/item/2.jpg",
        name: "アスパラ・ミート",
        priceL: 2570,
        priceM: 1490
    },
    {
        deleted: 0,
        description: "マッシュルームと熟成ベーコンにブラックペッパーをトッピングしたシンプルなピザ！",
        id: "SXRlbVR5cGU6Mw==",
        imagePath: "http://34.84.118.239/static/img/item/3.jpg",
        name: "熟成ベーコンとマッシュルーム",
        priceL: 2570,
        priceM: 1490
    },
    {
        deleted: 0,
        description: "マイルドな味付けのカレーに大きくカットしたポテトをのせた、バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です",
        id: "SXRlbVR5cGU6NA==",
        imagePath: "http://34.84.118.239/static/img/item/4.jpg",
        name: "カレーじゃがバター",
        priceL: 2980,
        priceM: 1900
    },
    {
        deleted: 0,
        description: "大きくカットしたポテトにコーンとベーコンをトッピングして、明太クリームソース、バター、チーズを合わせた、家族で楽しめるピザです",
        id: "SXRlbVR5cGU6NQ==",
        imagePath: "http://34.84.118.239/static/img/item/5.jpg",
        name: "明太バターチーズ",
        priceL: 2980,
        priceM: 1900
    },
    {
        deleted: 0,
        description: "「デラックス」、「ミート・シュプリーム」、「ツナマイルド」、「ガーリック・トマト」の組み合わせ。「チャリティー4」1枚のご注文につき、世界の飢餓救済に",
        id: "SXRlbVR5cGU6OA==",
        imagePath: "http://34.84.118.239/static/img/item/8.jpg",
        name: "Charity4",
        priceL: 3380,
        priceM: 2160
    },
    {
        deleted: 0,
        description: "あらびきスライスソーセージとイタリアンソーセージの2種類のソーセージを、トマトソースと特製マヨソースの2種類のソースで召し上がって頂く商品です",
        id: "SXRlbVR5cGU6MTM=",
        imagePath: "http://34.84.118.239/static/img/item/13.jpg",
        name: "めちゃマヨミート",
        priceL: 3380,
        priceM: 2160
    },
    {
        deleted: 0,
        description: "「めちゃマヨ・ミート」「ガーリック・トマト」「えびマヨコーン」、「フレッシュモッツァレラのマルゲリータ」が一つになった4種のピザ",
        id: "SXRlbVR5cGU6MTI=",
        imagePath: "http://34.84.118.239/static/img/item/12.jpg",
        name: "バラエティー４",
        priceL: 3380,
        priceM: 2160
    },
    {
        deleted: 0,
        description: "ピザの王道！トマトとフレッシュモッツァレラが絶妙です",
        id: "SXRlbVR5cGU6MTA=",
        imagePath: "http://34.84.118.239/static/img/item/10.jpg",
        name: "フレッシュモッツァレラ",
        priceL: 3380,
        priceM: 2160
    }
]
const toppings = [
    {
        id: 1,
        name: "topping 1",
        priceM: 20,
        priceL: 50
    }, {
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
    user: {
        id: 1,
        name: "yama",
        email: "ko@gmail.com",
        password: "123456",
        zipcode: "000-1111",
        address: "tokyo",
        telephone: "000-1111-2222",
        status: 0
    },
    orderItems: {
        edges: [
            {
                node:
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
                        orderToppings: {
                            edges: [
                                {
                                    node:
                                        {
                                            id: 1,
                                            topping: {
                                                id: 1,
                                                name: "topping 1",
                                                priceM: 25,
                                                priceL: 35
                                            },
                                            orderItem: 1
                                        },
                                    node: {
                                        id: 2,
                                        topping: {
                                            id: 2,
                                            name: "topping 2",
                                            priceM: 15,
                                            priceL: 30
                                        },
                                        orderItem: 1
                                    }
                                }
                            ]
                        },
                        quantity: 3,
                        size: "M",
                        subTotalPrice: 600
                    }
            }
        ]
    }
}


const history = [
    cart,
    cart,
    cart
]

const user = {
    id: "1",
    name: "test",
    email: "test@test.com",
    zipcode: "111-2222",
    address: "tokyo",
    telephone: "000-2222-4444",
    status: 0,
    password: "123456",
    orderSet: {
        pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
        },
        edges: [
            {
                cursor: "1"
            }
        ]
    }
}

// GraphQL の operation（query や mutation や subscription）が、実際にどのような処理を行なってデータを返すのかという指示書
const resolvers = {
    Date: dateScalar,
    Query: {
        // この中で引数に設定した値をもとにfilterをかけることができる
        cart: () => cart,
        user: () => user,
        toppings: () => {
            let edges = []
            toppings.forEach((i) => {
                edges.push({'node': i})
            })
            return {'edges': edges}
        },
        item: (p, args) => {
            const item = items.filter((i) => i.id === args.id)[0]
            if (item === undefined) throw new Error('no item')
            return item
        },
        items: (p, args) => {
            let edges = []
            items.forEach((i) => {
                edges.push({'node': i})
            })
            return {'edges': edges}
        },
        orderHistory: (p, args) => {
            let edges = []
            history.forEach((i) => {
                edges.push({'node': i})
            })
            return {'edges': edges}
        }
    },
    Mutation: {
        /*postUser(parent, args, context, info) {
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
        //今回は初期値にセットしてある内容を更新する
        updateOrderInfo(parent, args, context, info) {
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
        },*/
        addCart(parent, args) {
            // cart.orderItems.push(args.orderItem);
            // cart.totalPrice += args.totalPrice;
            console.log(args)
            //throw new Error()
            return {order: cart}
        },
        updateCart(parent, args) {
            console.log(args)
            return {order: cart}
        },
        deleteCart(parent, args) {
            console.log(args)
            return {order: cart}
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});