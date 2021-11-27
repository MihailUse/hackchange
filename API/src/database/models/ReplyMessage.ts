import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface ReplyMessageAttributes {
    id: number;
    massage: string;
    authorId: number;
    massageId: number;
    publicationId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface ReplyMessageInput extends Optional<ReplyMessageAttributes, 'id'> { }
export interface ReplyMessageOuput extends Required<ReplyMessageAttributes> { }


export class ReplyMessage extends Model<ReplyMessageAttributes, ReplyMessageInput> implements ReplyMessageAttributes {
    id: number;
    massage: string;
    authorId: number;
    massageId: number;
    publicationId: number;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}


ReplyMessage.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    massage: {
        type: DataTypes.TEXT
    },
    authorId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    massageId: {
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


