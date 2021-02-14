import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc        Fetch All Products
//@route       GET /api/products
//@access      Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  ///determines the amount of products to be shown on a single page
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
          ///option i refers to case insensitive
        },
      }
    : {};

  ///req.query can get the information behind the ?
  const count = await Product.countDocuments({ ...keyword });
  console.log(count);
  //get the product count
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page -1));
  ///if keyword is true spread operator it to find the matched product
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc        Fetch single Products
//@route       GET /api/products/id
//@access      Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//@desc        Delete a product
//@route       Delete /api/products/:id
//@access      Private / Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//@desc        Create a Product
//@route       POST /api/products/admin
//@access      Private Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInstock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc        Create a Product
//@route       PUT /api/products/admin
//@access      Private Admin

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.image = req.body.image;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc        Create a new review
//@route       POST /api/products/id/reviews
//@access      Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    ///find user already reviewed matching strings of id and user, iterating through everything
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    ///Push new review to review array []
    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    ///add up the total ratings by using reduce and then divide it by the length of the array (amount of reviews)
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc        Get top rated products
//@route       Get /api/products/top
//@access      Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  ///get all products so send an empty object
  ///rating -1 to get it in order
  res.json(products)
  
});




export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
