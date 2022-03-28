import { User } from 'src/modules/user/entities/user.entity';

export interface UserInRequest extends Request {
  user: User;
}
