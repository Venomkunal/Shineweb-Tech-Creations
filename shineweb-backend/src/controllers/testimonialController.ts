
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Testimonial from "../models/Testimonial";

const allowedFields = [
  "name",
  "role",
  "company",
  "category",
  "text",
  "rating",
  "avatarUrl",
  "isPublished",
  "sortOrder",
] as const;

type TestimonialField = (typeof allowedFields)[number];

function isValidObjectId(id: string): boolean {
  return mongoose.isValidObjectId(id);
}

export async function getPublicTestimonials(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await Testimonial.find({ isPublished: true })
      .select("-__v")
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials.",
    });
  }
}

export async function getAllTestimonials(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await Testimonial.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials.",
    });
  }
}

export async function createTestimonial(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      name,
      role,
      company,
      category,
      text,
      rating,
      avatarUrl,
      isPublished,
      sortOrder,
    } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof text !== "string" ||
      !text.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Name, category, and review text are required.",
      });
      return;
    }

    const data = await Testimonial.create({
      name,
      role,
      company,
      category,
      text,
      ...(rating !== undefined && { rating }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(isPublished !== undefined && { isPublished }),
      ...(sortOrder !== undefined && { sortOrder }),
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      data,
    });
  } catch (error: unknown) {
    if (
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to create testimonial.",
    });
  }
}

export async function updateTestimonial(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
      return;
    }

    const updates: Partial<Record<TestimonialField, unknown>> = {};

    for (const field of allowedFields) {
      if (Object.hasOwn(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: "No valid fields supplied.",
      });
      return;
    }

    const data = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!data) {
      res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
      data,
    });
  } catch (error: unknown) {
    if (
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update testimonial.",
    });
  }
}

export async function deleteTestimonial(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
      return;
    }

    const data = await Testimonial.findByIdAndDelete(req.params.id);

    if (!data) {
      res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial.",
    });
  }
}
