import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface CommentAttributes {
    id: number;
    massage: string;
    authorId: number;
    publicationId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface CommentInput extends Optional<CommentAttributes, 'id'> { }
export interface CommentOuput extends Required<CommentAttributes> { }


export class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    id: number;
    massage: string;
    authorId: number;
    publicationId: number;
}


Comment.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    massage: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    authorId: {
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


