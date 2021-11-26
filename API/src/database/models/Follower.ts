import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface FollowerAttributes {
    id: number;
    userId: number;
    followerId: number;
}


export interface FollowerInput extends Optional<FollowerAttributes, 'id'> { }
export interface FollowerOuput extends Required<FollowerAttributes> { }


export class Follower extends Model<FollowerAttributes, FollowerInput> implements FollowerAttributes {
    id: number;
    userId: number;
    followerId: number;
}


Follower.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    followerId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
},
    {
        sequelize: sequelizeDB,
        timestamps: true,
        paranoid: true
    }
);


