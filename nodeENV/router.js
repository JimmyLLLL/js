const Router = require("koa-router");
const router = new Router();
const user = require("./controller");

router.post("/api/blog/login", user.login);
router.post("/api/blog/memoryLogin", user.memoryLogin);


module.exports = router;
