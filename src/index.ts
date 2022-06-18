/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-18 21:00:58
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-18 22:14:46
 */
interface IMiddleWareType {
  path: string | null;
  method: string | null;
  fn: (req, res, next) => void;
}
import http from "http"
class tinyExpress {
  private middleWare: IMiddleWareType[]

  constructor() {
    this.middleWare = []
  }
  

  get (path: string, fn: (req, res, next)=>void)  {
    this.mountMiddleWare(path, "get", fn)
  }
  post (path: string, fn: (req, res, next)=>void) {
    this.mountMiddleWare(path, "post", fn)
  }
  delete (path: string, fn: (req, res, next)=>void){
    this.mountMiddleWare(path, "delete", fn)

  }
  put(path: string, fn: (req, res, next)=>void) {
    this.mountMiddleWare(path, "put", fn)

  }

  
  mountMiddleWare (path: string| null, method: string | null, fn: (req, res, next)=>void) {
    this.middleWare.push( {path, method, fn})
  }
  use ( fn: (req, res, next)=>void) {
    this.mountMiddleWare(null, null, (req,res,next) => {
      fn(req,res,next)
      next()
    })
  }
 
  handle( req, res) {
    let index = 0
    const next = () => {
      if (index < this.middleWare.length) {
        const {path, method, fn} = this.middleWare[index++]
        if (path == null || req.url === path && req.method.toLocaleLowerCase() === method) {
          fn(req, res,next)
        } else {
          next()
        }
      } else {
        res.end('404')
      }
    }
    next()
  }
  listen(prop: number, cb: () => void) {
    http.createServer((req, res) => {
      this.handle(req, res)
    }).listen(prop, cb)
  }

}

export default () => new tinyExpress()