import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc        Fetch All Products
//@route       GET /api/products
//@access      Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
