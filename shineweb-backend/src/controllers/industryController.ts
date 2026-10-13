
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Industry from "../models/industry";

// CREATE INDUSTRY
export const createIndustry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      slug,
      description,
      image,
      number,
      href,
      isPublished,
      sortOrder,
    } = req.body;

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !description?.trim() ||
      !image?.trim()
    ) {
      res.status(400).json({
        success: false,
        message:
          "Title, slug, description and image are required.",
      });
      return;
    }

    const normalizedSlug = slug.trim().toLowerCase();

    const existingIndustry = await Industry.findOne({
      slug: normalizedSlug,
    });

    if (existingIndustry) {
      res.status(409).json({
        success: false,
        message: "An industry with this slug already exists.",
      });
      return;
    }

    const industry = await Industry.create({
      title: title.trim(),
      slug: normalizedSlug,
      description: description.trim(),
      image: image.trim(),
      number,
      href,
      isPublished,
      sortOrder,
    });

    res.status(201).json({
      success: true,
      message: "Industry created successfully.",
      data: industry,
    });
  } catch (error) {
    console.error("Create industry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create industry.",
    });
  }
};

// GET ALL INDUSTRIES
export const getIndustries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(
      1,
      Number.parseInt(String(req.query.page ?? "1"), 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number.parseInt(String(req.query.limit ?? "50"), 10) || 50
      )
    );

    const filter: Record<string, unknown> = {};

    // Public visitors see published industries only.
    // Admins can pass ?all=true when using an admin-only route.
    if (req.query.all !== "true") {
      filter.isPublished = true;
    }

    const [industries, total] = await Promise.all([
      Industry.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Industry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: industries.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: industries,
    });
  } catch (error) {
    console.error("Get industries error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch industries.",
    });
  }
};

// GET SINGLE INDUSTRY BY MONGODB ID
export const getIndustryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid industry ID.",
      });
      return;
    }

    const industry = await Industry.findById(id).lean();

    if (!industry) {
      res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: industry,
    });
  } catch (error) {
    console.error("Get industry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch industry.",
    });
  }
};

// UPDATE INDUSTRY
export const updateIndustry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid industry ID.",
      });
      return;
    }

    const allowedFields = [
      "title",
      "slug",
      "description",
      "image",
      "number",
      "href",
      "isPublished",
      "sortOrder",
    ] as const;

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: "Provide at least one field to update.",
      });
      return;
    }

    for (const field of [
      "title",
      "slug",
      "description",
      "image",
    ] as const) {
      const value = updates[field];

      if (value !== undefined) {
        if (typeof value !== "string" || !value.trim()) {
          res.status(400).json({
            success: false,
            message: `${field} must be a non-empty string.`,
          });
          return;
        }

        updates[field] =
          field === "slug"
            ? value.trim().toLowerCase()
            : value.trim();
      }
    }

    if (
      updates.isPublished !== undefined &&
      typeof updates.isPublished !== "boolean"
    ) {
      res.status(400).json({
        success: false,
        message: "isPublished must be a boolean.",
      });
      return;
    }

    if (
      updates.sortOrder !== undefined &&
      (!Number.isInteger(updates.sortOrder) ||
        (updates.sortOrder as number) < 0)
    ) {
      res.status(400).json({
        success: false,
        message: "sortOrder must be a non-negative integer.",
      });
      return;
    }

    if (
      updates.slug !== undefined &&
      await Industry.exists({
        slug: updates.slug,
        _id: { $ne: id },
      })
    ) {
      res.status(409).json({
        success: false,
        message: "An industry with this slug already exists.",
      });
      return;
    }

    const industry = await Industry.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!industry) {
      res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Industry updated successfully.",
      data: industry,
    });
  } catch (error) {
    console.error("Update industry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update industry.",
    });
  }
};

// DELETE INDUSTRY
export const deleteIndustry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid industry ID.",
      });
      return;
    }

    const industry = await Industry.findByIdAndDelete(id);

    if (!industry) {
      res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Industry deleted successfully.",
      data: {
        id: industry._id,
        slug: industry.slug,
      },
    });
  } catch (error) {
    console.error("Delete industry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete industry.",
    });
  }
};
