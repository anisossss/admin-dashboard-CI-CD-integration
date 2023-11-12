const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
// const adminAuth = require("../middleware/adminAuth");

router.get("/statistics", adminCtrl.statistics);
router.get("/users-accounts", adminCtrl.accounts);
router.post("/add-user", adminCtrl.addUser);
router.post("/delete-user/:id", adminCtrl.deleteUser);
router.post("/add-credits/:id", adminCtrl.addCredits);
router.get("/get-orders", adminCtrl.orders);
router.get("/get-requests", adminCtrl.checkRequests);
router.post("/reply-requests/:id", adminCtrl.replyRequests);

module.exports = router;
