const {GraphQLScalarType, Kind} = require('graphql');

// customScalar
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

const {ApolloServer, gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Date

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  
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


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # ここに書いたオブジェクトたちをqueryで持ってくることができる
  type Query {
    order: Order
  }
  
`;


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


// サーバーが渡してくれるやつ
const resolvers = {
    Date: dateScalar,
    Query: {
        order: () => order,
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});