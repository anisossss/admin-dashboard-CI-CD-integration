const Users = require("../models/userModel");
const Orders = require("../models/orderModel");
const Contacts = require("../models/contactModel");
const bcrypt = require("bcrypt");
const SGmail = require("@sendgrid/mail");
SGmail.setApiKey(process.env.SENDGRID_API_KEY);

const adminCtrl = {
  statistics: async (req, res, next) => {
    try {
      let nbrUsers = await Users.countDocuments();
      let nbrOrders = await Orders.countDocuments();

      res.status(200).json({
        success: true,
        message: "statistics retrieved Successfully",
        nbrUsers,
        nbrOrders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  // name email subscriptionStatus
  accounts: async (req, res, next) => {
    try {
      const users = await Users.find().select(
        "subscriptionStatus emailVerified orders currentPlan email credits"
      );
      res.status(200).json({
        success: true,
        message: "Users retrieved Successfully",
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  addUser: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body.user;
      if (!name || !email || !password || !confirmPassword)
        return res.status(403).json({
          success: false,
          message: "Not all fields have been entered",
        });

      if (!validateEmail(email))
        return res.status(401).json({
          success: false,
          message: "Invalid email",
        });
      const user_email = await Users.findOne({ email });
      if (user_email) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered",
        });
      }
      if (password.length < 6) {
        return res.status(402).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }
      if (password !== confirmPassword)
        return res.status(405).json({
          success: false,
          message: "Password must be identical",
        });
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        emailVerified: true,
        credits: 100,
      });
      const user = await newUser.save();

      res.status(200).json({
        success: true,
        message: "New user created successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "User deleted Successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  addCredits: async (req, res, next) => {
    try {
      const user = await Users.findById(req.params.id);
      const { credits } = req.body;
      if (!credits)
        return res.status(403).json({
          success: false,
          message: "Not all fields have been entered",
        });
      console.log("user.credits", user.credits);
      console.log("credits", credits);

      const currentCredits = parseInt(user.credits); // Parse user.credits into a number
      const totalCredits = currentCredits + parseInt(credits); // Calculate the sum of currentCredits and credits
      user.credits = totalCredits.toString(); // Convert the sum back into a string

      console.log("user.credits", user.credits);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Plan retrieved Successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  orders: async (req, res, next) => {
    try {
      const orders = await Orders.find();
      const ordersWithUserName = await Promise.all(
        orders.map(async (order) => {
          const user = await Users.findById(order.user);
          const userName = user && user.name;
          console.log("userName", userName);
          return {
            ...order.toObject(),
            userName,
          };
        })
      );

      res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        orders: ordersWithUserName,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  checkRequests: async (req, res, next) => {
    try {
      const contacts = await Contacts.find();
      res.status(200).json({
        success: true,
        message: "Requests retrieved Successfully",
        contacts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  replyRequests: async (req, res, next) => {
    try {
      const contact = await Contacts.findById(req.params.id);
      const { reply } = req.body;
      let emailTemplate = await ejs.renderFile(
        "./src/api/controllers/views/reply.ejs",
        { newPath: newPath }
      );

      const message = {
        to: email,
        from: "support@kitchen-savvy.com",
        subject: "SUPPORT REPLY",
        text: "This is the reply on your support request",
        html: emailTemplate,
      };
      const sent = await SGmail.send(message, (err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Reply sent Successfully",
          });
        }
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = adminCtrl;
