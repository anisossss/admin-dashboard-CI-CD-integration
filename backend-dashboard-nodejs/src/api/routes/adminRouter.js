const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const adminAuth = require("../middleware/adminAuth");

router.get("/statistics", adminAuth, adminCtrl.statistics);
router.get("/users-accounts", adminAuth, adminCtrl.accounts);
router.post("/add-user", adminAuth, adminCtrl.addUser);
router.post("/delete-user/:id", adminAuth, adminCtrl.deleteUser);
router.post("/add-credits/:id", adminAuth, adminCtrl.addCredits);
router.get("/get-orders", adminAuth, adminCtrl.orders);
router.get("/get-requests", adminAuth, adminCtrl.checkRequests);
router.post("/reply-requests/:id", adminAuth, adminCtrl.replyRequests);

module.exports = router;
