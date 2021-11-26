import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "./router/ApplicationError";
import jwt from "jsonwebtoken";

export enum HTTPStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FROBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    INTERNAL = 500,
    NOT_IMPLEMENTED = 501,
    SERVICE_UNAVAILABLE = 503,
}

export interface ValidateJWTResponse {
    user: User;
    iat: number;
    exp: number;
}

async function validateJwt(options: { token: string }) {
    try {
        const { token } = options;

        if (!token) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "All parameters are required");
        }

        if (!options) {
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Parameters is required");
        }

        const verify = await jwt.verify(token, process.env.TOKEN_SECRET);

        if (!verify) {
            throw new ApplicationError(HTTPStatus.UNAUTHORIZED, "Unauthorized");
        }

        const user = await User.findByPk(verify.data.id, {
            attributes: {
                exclude: ["password"],
            }
        });

        if (!user) {
            throw new ApplicationError(HTTPStatus.NOT_FOUND, "User does not exist");
        }

        return {
            status: 200,
            message: "OK",
            user,
            iat: verify.iat,
            exp: verify.exp,
        };
    } catch (e) {
        throw e;
    }
}

export default async function validateJWT(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        
        if (!token) {
            throw new ApplicationError(HTTPStatus.NOT_FOUND ,"Token not defined");
        }

        const response: ValidateJWTResponse = await validateJwt({
            token: token,
        });

        req.body.token = response;
        next();
    } catch (err) {
        console.log(err);
        res.status(err?.status || HTTPStatus.INTERNAL).json(err);
    }
}
