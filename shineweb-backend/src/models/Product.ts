
import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
  type HydratedDocument,
} from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Laptops",
        "Desktops",
        "Servers",
        "Networking",
        "Software",
        "CCTV",
        "Accessories",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  featured: 1,
  active: 1,
  createdAt: -1,
});

export type ProductDocument = InferSchemaType<typeof productSchema>;

export type ProductHydratedDocument =
  HydratedDocument<ProductDocument>;

const Product =
  (mongoose.models.Product as Model<ProductDocument> | undefined) ??
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
