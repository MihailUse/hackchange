import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface PublicationAttributes {
    id: number;
    image: object;
    authorId: number;
    toolId: number;
    onlineLink: string;
    message: string;
}

export interface PublicationInput extends Optional<PublicationAttributes, 'id'> { }
export interface PublicationOuput extends Required<PublicationAttributes> { }


export class Publication extends Model<PublicationAttributes, PublicationInput> implements PublicationAttributes {
    id: number;
    image: object;
    authorId: number;
    toolId: number;
    onlineLink: string;
    message: string;

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
    authorId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    toolId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    onlineLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
    },
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);

