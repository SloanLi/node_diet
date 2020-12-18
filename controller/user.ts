import AuthService from '../service/user';
import UserModel from '../model/user';

const authService = new AuthService();
export default class UserController {
    constructor() {
        this.postUser = this.postUser.bind(this);
        this.getOpenId = this.getOpenId.bind(this);
        this.putUser = this.putUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    public async getOpenId(req:any, res:any, next:any) {
        const { code } = req.query;
        try {
            const data = await authService.getOpenID(code);
            res.send(data);
        } catch (err) {
            res.send(err);
        }
    }

    /**
     * postUser
    */
    public async postUser(req:any, res:any, next:any) {
        const userData = req.body;
        try {
            const queryResult = await UserModel.find({ openId: userData.openId });
            if (queryResult.length === 0) {
                const addUserData = new UserModel(userData);
                const data = await addUserData.save();
                res.send({
                    success: true, message: '创建成功', code: 200, data, error: {},
                });
            } else {
                res.send({
                    success: false, message: '重复数据，创建失败', code: 200, data: {}, error: {},
                });
            }
        } catch (error) {
            res.send({
                success: false, message: '创建失败', code: 200, data: {}, error,
            });
        }
    }

    /**
     * putUser
     */
    public async putUser(req:any, res:any, next:any) {
        const userData = req.body;
        if (!userData._id) {
            res.send({
                success: false, message: '修改失败', code: 200, data: {}, error: '_id不能为空',
            });
        }
        try {
            const updateResult = await UserModel.findOneAndUpdate({ _id: userData._id }, { $set: userData }, { upsert: true, new: true, useFindAndModify: false });
            res.send({
                success: false, message: '修改成功', code: 200, data: updateResult,
            });
        } catch (error) {
            res.send({
                success: false, message: '修改失败', code: 200, data: {},
            });
        }
    }

    /**
     * getUser
     */
    public async getUser(req:any, res:any, next:any) {
        const userId = req.query.id;
        if (!userId) {
            res.send({
                success: false, message: '查询失败', code: 200, data: {}, error: 'userId不能为空',
            });
        }
        try {
            const data = await UserModel.findOne({ _id: userId });
            res.send({
                success: true, message: '查询成功', code: 200, data, error: {},
            });
        } catch (error) {
            res.send({
                success: false, message: '查询失败', code: 200, data: {}, error,
            });
        }
    }

    /**
     * deleteUser
     */
    public async deleteUser(req:any, res:any, next:any) {
        const userId = req.query.id;
        if (!userId) {
            res.send({
                success: false, message: '修改失败', code: 200, data: {}, error: 'userId不能为空',
            });
        }
        try {
            const data = await UserModel.deleteOne({ userId });
            res.send({
                success: true, message: '删除失败', code: 200, data, error: {},
            });
        } catch (error) {
            res.send({
                success: false, message: '删除失败', code: 200, data: {}, error,
            });
        }
    }
}
