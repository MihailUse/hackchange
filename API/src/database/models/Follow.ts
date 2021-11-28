import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model } from 'sequelize-typescript';
import User from './User';


interface FollowAttributes {
    id: number;
    fromUserId: number;
    toUserId: number;
}


export interface FollowInput extends Optional<FollowAttributes, 'id'> { }
export interface FollowOuput extends Required<FollowAttributes> { }

@Table({
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: "follow",
    modelName: "Follow"
})
export default class Follow extends Model<FollowAttributes, FollowInput> implements FollowAttributes {
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
    fromUserId: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
    })
    toUserId: number;


    @BelongsTo(() => User, "fromUserId")
    fromUser: User;

    @BelongsTo(() => User, "toUserId")
    toUser: User;
}
