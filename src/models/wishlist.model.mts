import type { Collection } from "mongodb";
import mongodb from "../database/index.mts";

export interface Wishlist {
  _id?: string;
  userId: string;
  productIds: string[];
  createdAt: Date;
  modifiedAt: Date;
}

const collection = (): Collection<Wishlist> =>
  mongodb.getDb().collection<Wishlist>("wishlists");

export async function getWishlist(userId: string): Promise<Wishlist | null> {
  return collection().findOne({ userId });
}

export async function addProduct(
  userId: string,
  productId: string,
): Promise<Wishlist> {
  const now = new Date();
  const wishlist = await collection().findOneAndUpdate(
    { userId },
    {
      $setOnInsert: { userId, createdAt: now },
      $set: { modifiedAt: now },
      $addToSet: { productIds: productId },
    },
    { upsert: true, returnDocument: "after" },
  );

  return wishlist as Wishlist;
}

export async function removeProduct(
  userId: string,
  productId: string,
): Promise<Wishlist | null> {
  const wishlist = await collection().findOneAndUpdate(
    { userId },
    {
      $pull: { productIds: productId },
      $set: { modifiedAt: new Date() },
    },
    { returnDocument: "after" },
  );

  return wishlist;
}

export default { getWishlist, addProduct, removeProduct };
