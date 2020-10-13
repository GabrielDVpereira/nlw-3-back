import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import OphanageView from "../views/orphanagesView";
import * as Yup from "yup";

class OrphanageController {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations: ["images"],
    });

    return res.json(OphanageView.renderMany(orphanages));
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const orphanageRepository = getRepository(Orphanage);
    const orphanage = await orphanageRepository.findOneOrFail({
      where: { id },
      relations: ["images"],
    });

    return res.json(OphanageView.render(orphanage));
  }

  async create(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[]; // enforce typing of multer due to a possbile bug on multer lib
    const images = requestImages.map((image) => ({ path: image.filename }));

    const data = { ...req.body, images };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create({ ...req.body, images });
    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}

export default new OrphanageController();
