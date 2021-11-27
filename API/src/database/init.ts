import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Follower } from "./models/Follower";
import { Like } from "./models/Like";
import { Publication } from "./models/Publication";
import { Tool } from "./models/Tool";
import { ReplyComment } from "./models/ReplyComment"

User.sync({ alter: true });
Comment.sync({ alter: true });
Follower.sync({ alter: true });
Like.sync({ alter: true });
Publication.sync({ alter: true });
Tool.sync({ alter: true });
ReplyComment.sync({ alter: true });


User.hasMany(Follower, {
    foreignKey: 'userId'
});

User.hasMany(Follower, {
    foreignKey: 'followerId'
});

User.hasMany(Like, {
    foreignKey: 'userId'
});

User.hasMany(Comment, {
    foreignKey: 'userId'
});

User.hasMany(Publication, {
    foreignKey: 'userId'
});

Tool.hasMany(Publication, {
    foreignKey: 'toolId'
});

Publication.hasMany(Comment, {
    foreignKey: 'publicationId'
});

Publication.hasMany(Like, {
    foreignKey: 'publicationId'
});

Publication.hasMany(ReplyComment, {
    foreignKey: 'publicationId'
});

Comment.hasMany(ReplyComment, {
    foreignKey: 'commentId'
});

User.hasMany(ReplyComment, {
    foreignKey: 'userId'
});
