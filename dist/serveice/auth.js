"use strict";
const https = require("https");
class AuthService {
    constructor() {
        this.appid = 'wx0ddb6f1f6ea430e1';
        this.secret = '4a08517a208189b6244926798692fabb';
    }
    getOpenID(jsCode) {
        return new Promise((reslove, rejecct) => {
            https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${jsCode}&grant_type=authorization_code`, (res) => {
                let data = "";
                res.on("data", function (chunk) {
                    data += chunk;
                });
                res.on("end", () => {
                    console.log(data);
                });
                res.on("error", (err) => {
                    console.log(err.message);
                });
            });
        });
    }
}
