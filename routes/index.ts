import UserRouter from './user'
export default (app:any) => {
	app.use('/', UserRouter);
}