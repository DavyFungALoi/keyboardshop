import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc        Create new Order
//@route       POST /api/orders
//@access      Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length ===0) {
      res.status(400)
      throw new Error('No order Items')
      return
  } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
  }
});

//@desc        Create order by id
//@route       GET /api/orders/:id
//@access      Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (order) {
    res.json(order)
  }
  else {
    res.status(404)
    throw new Error('order not found')
  }

    
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid=true
    order.paidAt=Date.now()
    order.paymentResult={id:request.body.id, status: request.body.status, update_time: req.body.update_time, email_address: req.body.payer.email_address}

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
 
  else {
    res.status(404)
    throw new Error('order not found')
  }

    
});

export {addOrderItems, getOrderById, updateOrderToPaid}


