import { DataTypes, Optional } from 'sequelize'
import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, PrimaryKey, Table, Unique, Model, HasOne } from 'sequelize-typescript';
import Publication from './Publication';



interface ToolAttributes {
    id: number;
    name: string;
    description: string;
    image?: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface ToolInput extends Optional<ToolAttributes, 'id'> { }
export interface ToolOuput extends Required<ToolAttributes> { }

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: "tool",
    modelName: "Tool"
})
export default class Tool extends Model<ToolAttributes, ToolInput> implements ToolAttributes {
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

    @AllowNull(false)
    @Column({
        type: DataTypes.TEXT
    })
    description: string;

    @AllowNull(true)
    @Column({
        type: DataTypes.TEXT
    })
    image: string;

    @HasOne(() => Publication)
    publication: Publication;

    // timestamps
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly deletedAt: Date;
}
