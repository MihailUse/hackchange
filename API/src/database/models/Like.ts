import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeDB from '../sequelize'


interface LikeAttributes {
    id: number;
    userId: number;
    publicationId: number;
}


export interface LikeInput extends Optional<LikeAttributes, 'id'> { }
export interface LikeOuput extends Required<LikeAttributes> { }


export class Like extends Model<LikeAttributes, LikeInput> implements LikeAttributes {
    id: number;
    userId: number;
    publicationId: number;
}

Like.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    publicationId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
},
    {
        sequelize: sequelizeDB,
        timestamps: false,
        paranoid: false
    }
);
