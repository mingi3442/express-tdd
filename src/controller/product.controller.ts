import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";

export const ProductController = {
  async getProduct(req, res) {
    res.send({ message: "Welcome product" });
  },
  async createProduct(req: Request, res: Response, next?: NextFunction) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (next) next(error);
    }
  },
};
