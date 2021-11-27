import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface ReplyCommentAttributes {
    id: number;
    massage: string;
    userId: number;
    commentId: number;
    publicationId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface ReplyCommentInput extends Optional<ReplyCommentAttributes, 'id'> { }
export interface ReplyCommentOuput extends Required<ReplyCommentAttributes> { }


export class ReplyComment extends Model<ReplyCommentAttributes, ReplyCommentInput> implements ReplyCommentAttributes {
    id: number;
    massage: string;
    userId: number;
    commentId: number;
    publicationId: number;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}


ReplyComment.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    massage: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    commentId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    publicationId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);


