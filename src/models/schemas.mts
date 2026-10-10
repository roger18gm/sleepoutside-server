export const productSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Product",
  type: "object",
  required: ["_id", "id", "category", "name", "listPrice", "finalPrice"],
  properties: {
    _id: { type: "string" },
    id: { type: "string" },
    isClearance: { type: "boolean" },
    category: { type: "string" },
    isNew: { type: "boolean" },
    url: { type: "string" },
    reviews: {
      type: "object",
      required: ["reviewsUrl", "reviewCount", "averageRating"],
      properties: {
        reviewsUrl: { type: "string" },
        reviewCount: { type: "integer", minimum: 0 },
        averageRating: { type: "number", minimum: 0, maximum: 5 }
      }
    },
    nameWithoutBrand: { type: "string" },
    name: { type: "string" },
    images: {
      type: "object",
      required: ["primarySmall", "primaryMedium", "primaryLarge", "primaryExtraLarge"],
      properties: {
        primarySmall: { type: "string" },
        primaryMedium: { type: "string" },
        primaryLarge: { type: "string" },
        primaryExtraLarge: { type: "string" },
        extraImages: {
          type: "array",
          items: {
            type: "object",
            required: ["title", "src"],
            properties: {
              title: { type: "string" },
              src: { type: "string" }
            }
          }
        }
      }
    },
    sizesAvailable: { type: "object" },
    colors: {
      type: "array",
      items: {
        type: "object",
        required: ["colorCode", "colorName"],
        properties: {
          colorCode: { type: "string" },
          colorName: { type: "string" },
          colorChipImageSrc: { type: "string" },
          colorPreviewImageSrc: { type: "string" }
        }
      }
    },
    descriptionHtmlSimple: { type: "string" },
    suggestedRetailPrice: { type: "number", minimum: 0 },
    brand: {
      type: "object",
      required: ["id", "name"],
      properties: {
        id: { type: "string" },
        url: { type: "string" },
        productsUrl: { type: "string" },
        logoSrc: { type: "string" },
        name: { type: "string" }
      }
    },
    listPrice: { type: "number", minimum: 0 },
    finalPrice: { type: "number", minimum: 0 }
  }
};

export const userSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "User",
  type: "object",
  required: ["_id", "username", "email", "passwordHash", "firstName", "lastName", "createdAt", "modifiedAt"],
  properties: {
    _id: { type: "string" },
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    passwordHash: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    cart: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            required: ["productId", "name", "price", "quantity"],
            properties: {
              productId: { type: "string" },
              name: { type: "string" },
              price: { type: "number", minimum: 0 },
              image: { type: "string" },
              quantity: { type: "integer", minimum: 1 }
            }
          }
        }
      }
    },
    createdAt: { type: "string", format: "date-time" },
    modifiedAt: { type: "string", format: "date-time" }
  }
};

export const orderSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Order",
  type: "object",
  required: ["_id", "orderNumber", "userId", "items", "total", "status", "createdAt", "modifiedAt"],
  properties: {
    _id: { type: "string" },
    orderNumber: { type: "string" },
    userId: { type: "string" },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["productId", "name", "price", "quantity"],
        properties: {
          productId: { type: "string" },
          name: { type: "string" },
          price: { type: "number", minimum: 0 },
          quantity: { type: "integer", minimum: 1 },
          image: { type: "string" }
        }
      }
    },
    subtotal: { type: "number", minimum: 0 },
    tax: { type: "number", minimum: 0 },
    shipping: { type: "number", minimum: 0 },
    total: { type: "number", minimum: 0 },
    status: {
      type: "string",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
    },
    shippingAddress: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        zip: { type: "string" },
        country: { type: "string" }
      }
    },
    createdAt: { type: "string", format: "date-time" },
    modifiedAt: { type: "string", format: "date-time" }
  }
};

export const alertSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Alert",
  type: "object",
  required: ["_id", "title", "type", "status", "createdAt", "modifiedAt"],
  properties: {
    _id: { type: "string" },
    title: { type: "string" },
    type: { type: "string", enum: ["warning", "info", "promotion"] },
    status: { type: "string", enum: ["active", "inactive"] },
    createdAt: { type: "string", format: "date-time" },
    modifiedAt: { type: "string", format: "date-time" }
  }
};