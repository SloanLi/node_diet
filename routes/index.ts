import UserRouter from './user';
import DietRouter from './diet';

export default (app:any) => {
    app.use('/user', UserRouter);
    app.use('/diet', DietRouter);
};