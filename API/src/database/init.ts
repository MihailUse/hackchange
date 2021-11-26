import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Follower } from "./models/Follower";
import { Like } from "./models/Like";
import { Publication } from "./models/Publication";
import { Tool } from "./models/Tool";

Permission.hasMany(RoomUser, {
    foreignKey: 'permissionId'
});


User.sync({ alter: true });
Comment.sync({ alter: true });
Follower.sync({ alter: true });
Like.sync({ alter: true });
Publication.sync({ alter: true });
Tool.sync({ alter: true });
