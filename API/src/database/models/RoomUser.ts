import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model, HasOne } from 'sequelize-typescript';
import Permission from './Permission';
import Room from './Room';
import User from './User';


interface RoomUserAttributes {
    id: number;
    
    roomId: number;
    userId: number;
    permissionId: number;
}


export interface RoomUserInput extends Optional<RoomUserAttributes, 'id'> { }
export interface RoomUserOuput extends Required<RoomUserAttributes> { }

@Table({
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: "roomUser",
    modelName: "RoomUser"
})
export default class RoomUser extends Model<RoomUserAttributes, RoomUserInput> implements RoomUserAttributes {
    
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Room)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    roomId: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    userId: number;

    @ForeignKey(() => Permission)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    permissionId: number;


    @BelongsTo(() => Room)
    room: Room;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Permission)
    permission: Permission;
}
