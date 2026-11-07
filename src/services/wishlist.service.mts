import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
import wishlistModel, { type Wishlist } from "../models/wishlist.model.mts";
import productModel from "../models/product.model.mts";

const getWishlist = async (userId: string): Promise<Wishlist> => {
  const wishlist = await wishlistModel.getWishlist(userId);
  return wishlist ?? {
    userId,
    productIds: [],
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

const addProduct = async (userId: string, productId: string) => {
  const product = await productModel.getProductById(productId);

  if (!product) {
    throw new EntityNotFoundError({
      message: `Product ${productId} Not Found`,
      code: "ERR_NF",
      statusCode: 404,
    });
  }

  return wishlistModel.addProduct(userId, productId);
};

const removeProduct = async (userId: string, productId: string) =>
  wishlistModel.removeProduct(userId, productId);

export default { getWishlist, addProduct, removeProduct };
