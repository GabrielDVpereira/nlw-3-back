import express from "express";
import OrphanageController from "./controllers/OrphanageController";
import multer from "multer";
import multerConfig from "./config/upload";

const routes = express.Router();
const upload = multer(multerConfig);

routes.post("/orphanages", upload.array("images"), OrphanageController.create);
routes.get("/orphanages", OrphanageController.index);
routes.get("/orphanages/:id", OrphanageController.show);

export default routes;
