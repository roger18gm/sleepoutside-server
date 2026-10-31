import mongodb from "../database/index.mts";
import type { User } from "./types.mts";

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await mongodb.getDb().collection<User>("users").findOne({ email: email });
    return user;
}

async function createUser(newUser: { email: string, passwordHash: string, name: string }) {
    return await mongodb.getDb().collection("users").insertOne(newUser)
}

export default {
    getUserByEmail,
    createUser
};