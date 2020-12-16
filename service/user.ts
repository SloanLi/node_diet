const https = require("https");
export default class AuthService{
 protected appid='wx0ddb6f1f6ea430e1';
 protected secret='4a08517a208189b6244926798692fabb';
 /**
  * getOpenID
  */
 public getOpenID(jsCode:string) {
    return new Promise((reslove,rejecct)=>{
           https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${jsCode}&grant_type=authorization_code`, (res:any) => {
               let data = "";
               res.on("data", function(chunk:any) {
               data += chunk;
               });
               res.on("end", () => {
                
                reslove(data)
               });
               res.on("error", (err:any) => {
                rejecct(err)
               });
           });
       })
    }  
}