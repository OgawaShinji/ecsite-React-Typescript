import gql from "graphql-tag";

gql(`query fetchToppings{
  toppings{
    id
    name
    priceM
    priceL
  }
}`)