module.exports = function (req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        req.url += '_' + req.method // POSTもしくはPUTの時はreq.urlの語尾に'_POST'(もしくは'_PUT')をつける
        if (req.url === "/auth/login/_POST") {
            req.url = "/login"
        } else if (req.url === "/auth/logout/_POST") {
            req.url = "/logout"
        } else {//以下に表示したい物や加えたい処理を書いて下さい
            console.log(req.body)
            console.log(req.headers['Authorization'])
        }
        req.method = 'GET' // GETに偽装
    } else if (req.url === "/auth/user/") {
        req.url = "/user"
    } else if (req.url === "/django/cart") {
        req.url = "/cart"
    } else if (req.url === "/flask/item/1") {
        req.url = "/item"
    } else if (req.url === "/flask/topping/") {
        req.url = "/topping"
    } else if (req.url.match(/^\/flask\/item\?/)) {
        req.url = "/items"
    } else if (req.url === "/flask/item-name") {
        req.url = "/itemNames"
    } else if (req.url === "/flask/order-history/count") {
        req.url = "/order-history-count"
    } else if (req.url.match(/^\/flask\/order-history\?/)) {
        req.url = "/order-history"
    }
    next()
}