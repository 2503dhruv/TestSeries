// backend/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Students
router.post('/tickets', ticketController.createTicket);

// Admin
router.get('/admin/tickets', ticketController.getAllTickets);
router.patch('/admin/tickets/:id', ticketController.updateTicket);

module.exports = router;
