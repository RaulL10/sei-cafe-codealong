const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')


const lineItemSchema = new Schema({
    // Set qty to 1 when new item pushed into lineItems
    qty: { type: Number, default: 1 },
    item: itemSchema
  }, {
    timestamps: true
  });

  lineItemSchema.virtual('extPrice').get(function () {
    // 'this' is bound to the lineItem subdocument
    return this.qty * this.item.price;
  });



const orderSchema = new Schema({
    // An order belongs to a user
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // Embed an order's line items is logical
    lineItems: [lineItemSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
  });
  orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
  });
  
  orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
  });
  
  orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });

orderSchema.statics.getCart = function(userId) {
  return this.findOneAndUpdate(
    {user: userId, isPaid: false},
    {user: userId},
    {upsert: true, new: true}
  )
}


module.exports = mongoose.model('Order', orderSchema)