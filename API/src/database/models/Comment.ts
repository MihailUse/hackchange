import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model } from 'sequelize-typescript';
import Publication from './Publication';
import User from './User';


interface CommentAttributes {
    id: number;
    massage: string;
    userId: number;
    publicationId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface CommentInput extends Optional<CommentAttributes, 'id'> { }
export interface CommentOuput extends Required<CommentAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "comment",
    modelName: "Comment"
})
export default class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
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
    massage: string;

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

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
