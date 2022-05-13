const router = require("express").Router();

const repoContentController = require("../controllers/repoContent.controlller");
const repoController = require("./../controllers/repo.controller");
const templateController = require("./../controllers/template.controller");
const userRepoController = require("./../controllers/userRepo.controller");

router.post("", repoController);

router.get("/:userId", userRepoController);

router.post("/content", repoContentController);

router.get("/templates", templateController);

module.exports = router;