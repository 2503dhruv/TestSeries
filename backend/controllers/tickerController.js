// backend/controllers/ticketController.js
const Ticket = require('../models/Ticket');
// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.json(ticket);
  } catch (e) {
    res.status(400).json({ error: 'Ticket creation failed.' });
  }
};
// Get all tickets (admin only)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching tickets.' });
  }
};
// Update ticket (status/replies)
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(ticket);
  } catch (e) {
    res.status(400).json({ error: 'Error updating ticket.' });
  }
};
