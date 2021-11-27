import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Follower } from "./models/Follower";
import { Like } from "./models/Like";
import { Publication } from "./models/Publication";
import { Tool } from "./models/Tool";
import { ReplyMessage } from "./models/ReplyMessage"

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
    foreignKey: 'authorId'
});

User.hasMany(Publication, {
    foreignKey: 'authorId'
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

Publication.hasMany(Like, {
    foreignKey: 'publicationId'
});

Comment.hasMany(ReplyMessage, {
    foreignKey: 'commentId'
});

User.hasMany(ReplyMessage, {
    foreignKey: 'userId'
});

Publication.hasMany(ReplyMessage, {
    foreignKey: 'publicationId'
});



User.sync({ alter: true });
Comment.sync({ alter: true });
Follower.sync({ alter: true });
Like.sync({ alter: true });
Publication.sync({ alter: true });
Tool.sync({ alter: true });
ReplyMessage.sync({ alter: true });