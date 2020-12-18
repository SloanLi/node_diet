import dietModel from '../model/diet'
export default class DietController{
  constructor(){
    this.getDiet=this.getDiet.bind(this)
    this.postDiet=this.postDiet.bind(this)
    this.putDiet=this.putDiet.bind(this)
    this.deleteDiet=this.deleteDiet.bind(this)
  }

  /**
   * getDiet
   */
  public async getDiet(req:any,res:any,next:any) {
    const id=req.query.userId;
    if(!id){
        res.send({success:false,message:'查询失败',code:200,data:{},error:{message:'用户ID不能为空'}})
    }
    try{
        const data=await dietModel.find({userId:id})
        res.send({success:true,message:'成功',code:200,data,error:{}})
    }catch(error){
        res.send({success:false,message:'失败',code:200,data:{},error})

    }
  }
   /**
   * postDiet
   */
  public async postDiet(req:any,res:any,next:any) {
    const body=req.body;
    if(!body.userId){
      res.send({success:false,message:'添加失败，用户ID缺失',code:200,data:{},error:{}})
    }
    try{
       const data=await new dietModel(body).save()
      res.send({success:true,message:'添加成功',code:200,data,error:{}})
    }catch(error){
        res.send({success:false,message:'添加失败',code:200,data:{},error})
    }
  }

   /**
   * putDiet
   */
  public async putDiet(req:any,res:any,next:any) {
    const body=req.body;
    if(!body._id){
        res.send({success:false,message:'修改失败',code:200,data:{},error:'Id不能为空'})
    }
    try {
      const data= await dietModel.findOneAndUpdate({_id:body._id}, {$set:body}, {upsert:true,new:true,useFindAndModify:false})
        res.send({success:false,message:"修改成功",code:200,data})
    } catch (error) {
        res.send({success:false,message:"修改失败",code:200,data:{}})
    }
  }
   /**
   * deleteDiet
   */
  public async deleteDiet(req:any,res:any,next:any) {
    const id=req.query.id;
    if(!id){
        res.send({success:false,message:'修改失败',code:200,data:{},error:'id不能为空'})
    }
    try{
        const data=await dietModel.deleteOne({_id:id})
        res.send({success:true,message:'删除成功',code:200,data,error:{}})
    }catch(error){
        res.send({success:false,message:'删除失败',code:200,data:{},error})

    }
  }
}