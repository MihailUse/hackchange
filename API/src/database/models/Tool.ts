import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface ToolAttributes {
    id: number;
    name: string;
    description: string;
    image: Blob;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface ToolInput extends Optional<ToolAttributes, 'id'> { }
export interface ToolOuput extends Required<ToolAttributes> { }


export class Tool extends Model<ToolAttributes, ToolInput> implements ToolAttributes {
    id: number;
    name: string;
    description: string;
    image: Blob;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}


Tool.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB
    }
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);
