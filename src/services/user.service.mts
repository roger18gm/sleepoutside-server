import * as argon2 from "argon2";
import type { User } from "../models/types.mts";
import userModel from "../models/user.model.mts";
import { generateToken, validator } from "./utils.mts";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
import { UserSchema } from "../database/json-schema.ts";


async function login(email: string, password: string) {
    // Check if the user exists in the database. the user will be providing an email as identifier...so we will need a function in the model to retrieve a user by email
    let user: User | null = null;
    let token = null;
    user = await userModel.getUserByEmail(email);
    // check to see if a user was found, ANd that the password provided matches the one returned from the database. Remember that the password in the database is hashed and salted...so we need to use argon2 to verify it "argon2.verify(password, passwordHash)"
    if (user) {
        const passwordHash = user.passwordHash
        const match = await argon2.verify(passwordHash, password)

        // If the user exists and password matches...then generate a token using jsonwebtoken
        if (match) {
            token = generateToken(user)
        }
    }

    return { user, token }
    // Send back the token and some user info to the route either or both could be null.
};

async function register(email: string, password: string, name: string) {
    const user = await userModel.getUserByEmail(email);
    if (user) throw new EntityNotFoundError({ message: "User already exists", statusCode: 409 });
    const passwordHash = await argon2.hash(password)
    const newUser = {
        email,
        passwordHash,
        name,
        createdAt: new Date(),
        modifiedAt: new Date()
    }
    validator(UserSchema, newUser);

    return userModel.createUser(newUser)
}

export default { login, register }