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
gql(`query fetchItems($f:Int,$offset:Int,$sort:String,$name:String) {
  items(first:$f,orderBy:$sort,offset:$offset,name_Icontains:$name) {
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