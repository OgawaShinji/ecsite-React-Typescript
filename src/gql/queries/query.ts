import gql from "graphql-tag";

gql(`query fetchItems {
  items {
    edges {
      node {
        id
        name
        description
        priceM
        priceL
        imagePath
        deleted
      }
    }
  }
}
`)