import { getUser } from '../../../server/controllers/user';
import connectDB from '../../../server/db/mongodb'

export default connectDB(getUser);
