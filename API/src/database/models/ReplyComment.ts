import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import User from './User';
import Comment from './Comment';
import Publication from './Publication';


interface ReplyCommentAttributes {
    id: number;
    massage: string;
    
    userId: number;
    commentId: number;
    publicationId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface ReplyCommentInput extends Optional<ReplyCommentAttributes, 'id'> { }
export interface ReplyCommentOuput extends Required<ReplyCommentAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "replyComment",
    modelName: "ReplyComment",
})
export default class ReplyComment extends Model<ReplyCommentAttributes, ReplyCommentInput> implements ReplyCommentAttributes {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number;

    @AllowNull(false)
    @Column({
        type: DataTypes.TEXT
    })
    massage: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    userId: number;

    @ForeignKey(() => Comment)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    commentId: number;

    @ForeignKey(() => Publication)
    @AllowNull(false)
    @Column({
        type: DataTypes.BIGINT
    })
    publicationId: number;


    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Comment)
    comment: Comment;

    @BelongsTo(() => Publication)
    publication: Publication;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
