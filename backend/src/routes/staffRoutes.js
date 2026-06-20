// src/routes/staffRoutes.js
// Staff accounts management routes.

const { Router } = require("express");
const staffController = require("../controllers/staffController");

const router = Router();

// Retrieve all active staff/users under the shopkeeper's tenant
router.get("/", staffController.getStaff);

// Invite/create a new staff user
router.post("/", staffController.inviteStaff);

// Delete/deactivate a staff user
router.delete("/:id", staffController.deleteStaff);

// Update a staff user (e.g. change role / restrict account)
router.put("/:id", staffController.updateStaff);

module.exports = router;
