import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import RoomUser from './RoomUser';



interface RoomAttributes {
    id: number;
    roomUuid: string;
    name: string;
    description: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface RoomInput extends Optional<RoomAttributes, 'id'> { }
export interface RoomOuput extends Required<RoomAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "room",
    modelName: "Room"
})
export default class Room extends Model<RoomAttributes, RoomInput> implements RoomAttributes {
    
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    roomUuid: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    name: string;

    @AllowNull(true)
    @Column({
        type: DataTypes.TEXT
    })
    description: string;


    @HasMany(() => RoomUser, "userId")
    users: RoomUser[];

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
