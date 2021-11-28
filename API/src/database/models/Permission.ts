import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model, HasOne } from 'sequelize-typescript';
import RoomUser from './RoomUser';


interface PermissionAttributes {
    id: number;
    name: string;
    description: string;
}

export interface PermissionInput extends Optional<PermissionAttributes, 'id'> { }
export interface PermissionOuput extends Required<PermissionAttributes> { }

@Table({
    paranoid: false,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: "permission",
    modelName: "Permission"
})
export default class Permission extends Model<PermissionAttributes, PermissionInput> implements PermissionAttributes {
    
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
        type: DataTypes.STRING(256)
    })
    name: string;

    @AllowNull(true)
    @Column({
        type: DataTypes.TEXT
    })
    description: string;


    @HasOne(() => RoomUser, "permissionId")
    roomUser: RoomUser;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
