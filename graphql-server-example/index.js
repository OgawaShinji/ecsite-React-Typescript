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
    id: ID
    name: String
    description: String
    priceM: Int
    priceL: Int
    imagePath: String
    deleted: Int
  }
  
  type Topping{
    id: ID
    name: String
    priceM: Int
    priceL: Int
  }
  
  type OrderItem{
    id: ID
    item: Item
    orderToppings: [OrderTopping]
    quantity: Int
    size: String
    subTotalPrice: Int
  }
  
  type OrderTopping{
    id: ID
    topping: Topping
    orderItemId: Int
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

  # ここに書いたオブジェクトたちをqueryで持ってくることができる
  type Query {
    order: Order
    users: [User]
  }
  
  type Mutation{
     postUser(
        name: String
        email: String
        zipcode: String
        address: String
        telephone: String
        status: Int
        password: String
     ): [User]
     
     update(
        id: ID!
        name: String
        email: String
    ): [User]

  }
`;

// 初期値として入れておきたい値を設定してください

const order = {
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
                    id: 2,
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


// serverが渡してくれるやつ
// queryやmutationの処理を定義
const resolvers = {
    Date: dateScalar,
    Query: {
        order: () => order,
        users: () => users
    },
    Mutation: {
        postUser(parent, args) {
            console.log(parent)
            let user = {
                id: Math.floor(Math.random() * 100),
                status: 1,
                ...args
            }
            users.push(user)
            //登録したユーザー情報が返ってくる
            return users
        },
        update(parent, args) {
            //ユーザーリストから対象ユーザーをidで特定する
            const index = users.findIndex(({id}) => id === Number(args.id));
            //対象ユーザーの情報を更新
            users[index].name = args.name
            users[index].email = args.email
            return users

        },

    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});