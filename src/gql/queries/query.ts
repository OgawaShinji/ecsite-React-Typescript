import gql from "graphql-tag";

const fetchItemNames = gql(`query fetchItemNames {
  items {
    edges {
      node {
        name
        }
    }
  }
}
`)
gql(`query fetchItems($first:Int,$offset:Int,$sort:String,$name:String) {
  items(first:$first,orderBy:$sort,offset:$offset,name_Icontains:$name) {
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
}`)