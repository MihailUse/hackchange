import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';

import Tool from './Tool';
import User from './User';
import Comment from './Comment';
import ReplyComment from './ReplyComment';


interface PublicationAttributes {
    id: number;
    image?: object;
    title: string;
    message: string;
    onlineLink?: string;
    userId: number;
    toolId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PublicationInput extends Optional<PublicationAttributes, 'id'> { }
export interface PublicationOuput extends Required<PublicationAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "publication",
    modelName: "Publication"
})
export default class Publication extends Model<PublicationAttributes, PublicationInput> implements PublicationAttributes {
    
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
    image: object;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataTypes.STRING(256)
    })
    title: string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataTypes.TEXT
    })
    message: string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataTypes.STRING(256)
    })
    onlineLink: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    userId: number;

    @ForeignKey(() => Tool)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    toolId: number;


    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Tool)
    tool: Tool;

    @HasMany(() => Comment, "userId") //  { foreignKey: "userId" }
    comments: Comment[];

    @HasMany(() => ReplyComment, "userId")
    replyComments: ReplyComment[];

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
