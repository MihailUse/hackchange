import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface UserAttributes {
    id: number;
    avatar?: object;
    name: string;
    email: string;
    password: string;
    shortLink?: string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface GetAllUsersFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOuput extends Required<UserAttributes> { }


export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id: number;
    avatar: object;
    name: string;
    email: string;
    password: string;
    shortLink: string;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}


User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    avatar: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    shortLink: {
        type: DataTypes.STRING(256),
        allowNull: true
    }
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);
