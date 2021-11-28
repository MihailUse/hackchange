import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import Room from './Room';
import User from './User';


interface MessageAttributes {
    id: number;
    message: string;
    
    roomId: number;
    userId: number;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface MessageInput extends Optional<MessageAttributes, 'id'> { }
export interface MessageOuput extends Required<MessageAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "message",
    modelName: "Message"
})
export default class Message extends Model<MessageAttributes, MessageInput> implements MessageAttributes {
    
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
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
