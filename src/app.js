const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const views = require('koa-views')
const route = new Router()
const router = require("./route/routes")

app.use(views("view", {
  extension: "ejs"
}))
router(route)
app.use(route.routes())
app.listen(3000)
console.log("[demo] listening on port 3000")