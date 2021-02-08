import gql from "graphql-tag";
//本番環境用query
// ============================ order  ====================================================================


// ============================= topping ====================================================================

gql(`
    query fetchToppings {
      toppings {
        edges {
          node {
            id
            name
            priceM
            priceL
          }
        }
      }
    }
`)

// ============================= item ====================================================================

gql(`
    query fetchItem($id: ID!){
      item(id: $id){
        id
        name
        description
        priceM
        priceL
        imagePath
        deleted
      }
    }
`)

gql(`
    query fetchItems($sort: String, $itemName: String) {
      items(name_Icontains: $itemName, orderBy: $sort) {
        edges {
          node {
            id
            name
            description
            imagePath
            priceM
            priceL
            deleted
          }
        }
      }
    }
`)

gql(`
    query fetchItemNames {
      items {
        edges {
          node {
            name
          }
        }
      }
    }
`)

gql(`
    query fetchItemsTotalCount {
      items {
        totalCount
      }
    }
`)

// ============================ user ============================================================================

// ============================ history ============================================================================

gql(`
    query fetchOrderHistory($limit: Int, $offset: Int) {
      orderHistory(first: $limit, offset: $offset, orderBy: "-orderDate,-id") {
        pageInfo{
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            totalPrice
            orderDate
            destinationName
            destinationEmail
            destinationZipcode
            destinationAddress
            destinationTel
            deliveryTime
            paymentMethod
            status
            orderItems{
              pageInfo{
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
              edges{
                node{
                  id
                  item{
                    id
                    name
                    description
                    imagePath
                    priceM
                    priceL
                    deleted
                  }
                  orderToppings{
                    pageInfo{
                      hasPreviousPage
                      hasNextPage
                      startCursor
                      endCursor
                    }
                    edges{
                      node{
                        id
                        topping{
                          id
                          name
                          priceM
                          priceL
                        }
                      }
                      cursor
                    }
                  }
                  quantity
                  size
                  subTotalPrice
                }
                cursor
              }
            }
          }
          cursor
        }
      }
    }
`)
