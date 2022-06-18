/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-18 21:07:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-18 22:16:02
 */
import tinyExpress from "../src";

const app = tinyExpress()

app.use(()=> {
  console.log("first middleware")
})

app.get("/", (req, res, next) => {
  console.log("router: / ===> start")
  next()
  res.end("get /")
})

app.use(()=> {
  console.log("second middleware")
})

app.get("/user", (req, res, next) => {
  console.log("router: /user ===> start")
  console.log("router: /user ===> end")
  res.end("get /user")
})

app.listen(8080,()=>{
  console.log('server is start on prop 8080')
})
