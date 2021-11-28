import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize'
import Follow from './Follow';
import Publication from './Publication';
import RoomUser from './RoomUser';


interface UserAttributes {
    id: number;
    avatar?: string;
    firstName: string;
    middleName: string;
    lastName: string;
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

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "user",
    modelName: "User",
})
export default class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number;

    @AllowNull(true)
    @Column({
        type: DataTypes.TEXT
    })
    avatar: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    firstName: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    middleName: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    lastName: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    email: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(256)
    })
    password: string;

    @AllowNull(true)
    @Column({
        type: DataTypes.STRING(256)
    })
    shortLink: string;


    @HasMany(() => Publication, "userId") //  { foreignKey: "userId" }
    publications: Publication[];

    @HasMany(() => Follow, "fromUserId")
    following: Follow[];

    @HasMany(() => Follow, "toUserId")
    followers: Follow[];

    @HasMany(() => RoomUser, "userId")
    rooms: RoomUser[];

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
