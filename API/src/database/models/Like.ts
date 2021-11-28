import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model } from 'sequelize-typescript';
import Publication from './Publication';
import User from './User';


interface LikeAttributes {
    id: number;

    userId: number;
    publicationId: number;
}


export interface LikeInput extends Optional<LikeAttributes, 'id'> { }
export interface LikeOuput extends Required<LikeAttributes> { }

@Table({
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: "like",
    modelName: "Like",
})
export default class Like extends Model<LikeAttributes, LikeInput> implements LikeAttributes {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    userId: number;

    @ForeignKey(() => Publication)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    publicationId: number;


    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Publication)
    publication: Publication;
}
