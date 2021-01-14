module.exports = function (req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        req.url += '_' + req.method // POSTもしくはPUTの時はreq.urlの語尾に'_POST'(もしくは'_PUT')をつける
        if (req.url === "/auth/login/_POST") {
            req.url = "/login"
        } else if (req.url === "/auth/logout/_PUT") {
            req.url = "/logout"
        } else {//以下に表示したい物や加えたい処理を書いて下さい
            console.log(req.body)
            console.log(req.headers['Authorization'])
        }
        req.method = 'GET' // GETに偽装
    } else if (req.url === "/auth/user/") {
        req.url = "/user"
    }
    next()
}