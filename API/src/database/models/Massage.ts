import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import Room from './Room';
import User from './User';


interface MassageAttributes {
    id: number;
    message: string;
    
    roomId: number;
    userId: number;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface MassageInput extends Optional<MassageAttributes, 'id'> { }
export interface MassageOuput extends Required<MassageAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "massage",
    modelName: "Massage"
})
export default class Massage extends Model<MassageAttributes, MassageInput> implements MassageAttributes {
    
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
        type: DataTypes.TEXT
    })
    message: string;

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

 
    @BelongsTo(() => Room)
    tool: Room;

    @BelongsTo(() => User)
    user: User;

    // timestamps
    public readonly sendedAt: Date;
}
