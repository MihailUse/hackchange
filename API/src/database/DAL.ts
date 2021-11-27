import { Op } from "sequelize";
import { ApplicationError } from "../router/ApplicationError";
import { HTTPStatus } from "../utils";
import { User } from "./models/User";


export class DAL {

    static async tryGetUser(id: string | number, options: any = {}): Promise<User> {
        let ret;
        const asNum = Number(id);
        if (!Number.isNaN(asNum)) {
            ret = await User.findByPk(id, options);
        } else if (typeof id === "string") {
            ret = await User.findOne({
                ...options,
                where: {
                    shortLink: {
                        [Op.iLike]: `%${id.toLowerCase()}%`
                    }
                }
            });
        }

        if (!ret) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, `user ${id} not found`);
        }

        return ret;
    }

    static async getUserByEmail(email: string): Promise<User> {
        const query = User.findOne({
            where: {
                email: {
                    [Op.iLike]: `%${email}%`,
                }
            }
        });

        return query;
    }

}