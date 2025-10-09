// backend/models/Ticket.js
const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' }, // optional
  category: { type: String, default: "General" },
  message: { type: String, required: true },
  status: { type: String, enum: ["open", "pending", "resolved"], default: "open" },
  adminReplies: [
    { text: String, date: Date, adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' } }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Ticket', TicketSchema);
