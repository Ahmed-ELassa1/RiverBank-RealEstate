import connection from "./DB/connection.js";
import cors from "cors";
import { globalErrorHandling } from "./utils/asyncHandler.js";
import userRouter from "./modules/user/user.router.js";
import blogRouter from "./modules/blog/blog.router.js";
import clientRequestRouter from "./modules/clientRequest/clientRequest.router.js";
import propertyRouter from "./modules/property/property.router.js";
import developersRouter from "./modules/developer/developer.router.js";
import projectRouter from "./modules/projects/project.router.js";
function Bootstrap(app, express) {
  var whitelist = ["http://example1.com", "http://example2.com"];
  connection();
  if (process.env.MODE == "DEV") {
    app.use(cors());
  } else {
    app.use(async (req, res, next) => {
      if (!whitelist.includes(req.header("origin"))) {
        return next(new Error("not allowed by cores", { cause: 502 }));
      }
      await res.header("Access-Control-Allow-Origin", "*");
      await res.header("Access-Control-Allow-Header", "*");
      await res.header("Access-Control-Allow-Private-network", "true");
      await res.header("Access-Control-Allow-Method", "*");
      next();
    });
  }
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/blog", blogRouter);
  app.use("/clientRequest", clientRequestRouter);
  app.use("/property", propertyRouter);
  app.use("/developer", developersRouter);
  app.use("/project", projectRouter);
  app.use(globalErrorHandling);
}
export default Bootstrap;
