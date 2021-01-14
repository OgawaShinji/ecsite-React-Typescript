module.exports = function (req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        req.url += '_' + req.method // POSTもしくはPUTの時はreq.urlの語尾に'_POST'(もしくは'_PUT')をつける
        req.method = 'GET' // GETに偽装
        console.log(req.headers['token'])
        console.log(req.url)
    }
    next()
}