import mongoose from 'mongoose';
let AddToCartSchema = new mongoose.Schema(
  {
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
);
let AddToCartModel = mongoose.model('AddToCart', AddToCartSchema);
export { AddToCartModel };
