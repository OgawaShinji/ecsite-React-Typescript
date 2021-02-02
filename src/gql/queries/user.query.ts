import gql from "graphql-tag";

const postRegister = gql(`mutation postRegister($userInfo: UserInfo!) {
   postUser(userInfo: $userInfo){
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
`)

const fetchUser = gql(`query listUser {
   users {
    id
    name
    email
    zipcode
    address
    telephone
    status
    password
  }
}
`)