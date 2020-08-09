const db = require("../models");
const passport = require("passport");
require("../config/passport")(passport);
const mongoose = require("mongoose");

module.exports = {
  //Create User
  createUser: function (req, res, next) {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        db.User.create({ email: monogoUser[0].email })
          .then((dbModel) => {
            db.User.find({ email: mongoUser[0].email })
              .populate("issues")
              .then((data) => {
                res.json(data);
              });
          })
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },
  //Find User
  findUser: function (req, res, next) {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        db.User.find({ email: mongoUser[0].email })
          .populate("issues")
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },
  //Add Project to User
  addProject: function (req, res, next) {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        db.User.update(
          { email: mongoUser[0].email },
          { $push: { projects: req.body } }
        )
          .then((dbModel) => {
            db.User.find({ email: mongoUser[0].email })
              .populate("issues")
              .then((data) => {
                res.json(data);
              });
          })
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },
  //update Project
  // updateProjectProgress: function (req, res, next) {
  //   passport.authenticate("jwt", async function (err, mongoUser, info) {
  //     if (mongoUser) {
  //       console.log("Access granted for user with JWT");
  //       db.User.update(
  //         {
  //           email: mongoUser[0].email,
  //           "projects._id": req.params.id,
  //         },
  //         { $set: { "projects.$.inProgress": req.body.inProgress } }
  //       )
  //         .then((dbModel) => {
  //           db.User.find({ email: mongoUser[0].email })
  //             .populate("issues")
  //             .then((data) => {
  //               res.json(data);
  //             });
  //         })
  //         .catch((err) => res.status(422).json(err));
  //     } else {
  //       console.log("Access denied for user with JWT");
  //       res.json({ loggedIn: false });
  //     }
  //   })(req, res, next);
  // },
  updateProjectProgress: function (req, res, next) {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        const path = `projects.$.${req.body.field}`
        db.User.update(
          {
            email: mongoUser[0].email,
            "projects._id": req.params.id,
          },
          { $set: { path: req.body.status } }
        )
          .then((dbModel) => {
            db.User.find({ email: mongoUser[0].email })
              .populate("issues")
              .then((data) => {
                res.json(data);
              });
          })
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },

  // updateProjectCompleted: function (req, res, next) {
  //   passport.authenticate("jwt", async function (err, mongoUser, info) {
  //     if (mongoUser) {
  //       console.log("Access granted for user with JWT");
  //       db.User.updateOne(
  //         {
  //           email: mongoUser[0].email,
  //           "projects._id": req.params.id,
  //         },
  //         { $set: { "projects.$.completed": req.body.completed } }
  //       )
  //         .then((dbModel) => {
  //           db.User.find({ email: mongoUser[0].email })
  //             .populate("issues")
  //             .then((data) => {
  //               res.json(data);
  //             });
  //         })
  //         .catch((err) => res.status(422).json(err));
  //     } else {
  //       console.log("Access denied for user with JWT");
  //       res.json({ loggedIn: false });
  //     }
  //   })(req, res, next);
  // },
  //Add Issue to User
  addIssue: async (req, res, next) => {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      console.log(mongoUser);
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        db.User.update(
          {
            "email": mongoUser[0].email
          },
          { $push: { "projects.$[j].issues": req.body } },
          {
            arrayFilters: [
              { "j._id": mongoose.Types.ObjectId(req.params.projectId) },
            ],
          }
        )
          .then((data) => {
            res.json(data);
          })
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },
  //update Issue
  updateIssue: function (req, res, next) {
    passport.authenticate("jwt", async function (err, mongoUser, info) {
      if (mongoUser) {
        console.log("Access granted for user with JWT");
        console.log(req.body)
        db.User.update(
          {
            "email": mongoUser[0].email
          },
          { $set: { "projects.$[j].issues.$[h].completed": req.body.completed } },
          {
            arrayFilters: [
              { "j._id": mongoose.Types.ObjectId(req.params.projectId) },
              { "h._id": mongoose.Types.ObjectId(req.body.issueId) },
            ],
          }
        )
          .then((data) => {
            res.json(data);
          })
          .catch((err) => res.status(422).json(err));
      } else {
        console.log("Access denied for user with JWT");
        res.json({ loggedIn: false });
      }
    })(req, res, next);
  },
};
