import AuthService from '../service/user'
import UserModel from '../model/user'
const mongoose =require('mongoose')
var querystring = require('querystring');
const authService=new AuthService()
const user=mongoose.model('user',UserModel)
export default class UserController{
    constructor(){
        this.queryUser=this.queryUser.bind(this)
        this.postUser=this.postUser.bind(this)
        this.getOpenId=this.getOpenId.bind(this)

    }
    public async getOpenId(req:any, res:any, next:any){
        const code=req.query.code;
        try{
            const data=await authService.getOpenID(code)
            res.send(data)
        }catch(err){
            res.send(err)
        }
    }
    /**
     * postUser
r     */
    public async postUser(req:any,res:any,next:any) {
        const userData=req.body;
        if(!userData.userId){
        userData.userId=(Math.random()*100000).toFixed(0)
        }
        try{
            const queryResult=await this.queryUser({userName:userData.userName})
            if(queryResult.length<0){
                const addUserData=new user(userData)
                addUserData.save(function (err:any, data:any) {
                    if (err){
                        res.send({success:false,message:'创建失败',code:200,data:{},error:err})
                    } 
                    res.send({success:true,message:'创建成功',code:200,data,error:{}})
                })        
            }else{
                res.send({success:false,message:'重复数据，创建失败',code:200,data:{},error:{}})
            }
        }catch(error){
            console.log(error)
            res.send({success:false,message:'创建失败',code:200,data:{}})
        }
            
    }
    public  async queryUser(data:object):Promise<Array<any>>{
        try{
            const result= await user.findOne(data)
            return Promise.resolve(result);

        }catch(error){
            return Promise.reject(error);
        }
            
    }
}