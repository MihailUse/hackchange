import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface PublicationAttributes {
    id: number;
    image: object;
    title: string;
    message: string;
    onlineLink: string;
    authorId: number;
    toolId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PublicationInput extends Optional<PublicationAttributes, 'id'> { }
export interface PublicationOuput extends Required<PublicationAttributes> { }


export class Publication extends Model<PublicationAttributes, PublicationInput> implements PublicationAttributes {
    id: number;
    image: object;
    title: string;
    message: string;
    onlineLink: string;
    authorId: number;
    toolId: number;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}

Publication.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB,
    },
    title: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    toolId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    onlineLink: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);

