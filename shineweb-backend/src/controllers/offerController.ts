import type { Request, Response } from "express";
import mongoose from "mongoose";
import Offer from "../models/Offer";

const allowedFields = [
  "title",
  "highlight",
  "description",
  "eyebrow",
  "features",
  "buttonText",
  "buttonLink",
  "footnote",
  "active",
  "priority",
] as const;

function validateOfferBody(body: unknown) {
  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return "A valid offer object is required.";
  }

  const data = body as Record<string, unknown>;

  if (
    typeof data.title !== "string" ||
    !data.title.trim() ||
    typeof data.description !== "string" ||
    !data.description.trim()
  ) {
    return "Title and description are required.";
  }

  if (
    data.features !== undefined &&
    (!Array.isArray(data.features) ||
      data.features.length > 8 ||
      !data.features.every(
        (item) =>
          typeof item === "string" && item.trim().length > 0
      ))
  ) {
    return "Features must be an array of up to 8 non-empty strings.";
  }

  if (
    data.active !== undefined &&
    typeof data.active !== "boolean"
  ) {
    return "Active must be true or false.";
  }

  if (
    data.priority !== undefined &&
    (!Number.isInteger(data.priority) ||
      Number(data.priority) < 0 ||
      Number(data.priority) > 9999)
  ) {
    return "Priority must be an integer from 0 to 9999.";
  }

  for (const field of [
    "title",
    "highlight",
    "description",
    "eyebrow",
    "buttonText",
    "buttonLink",
    "footnote",
  ]) {
    if (
      data[field] !== undefined &&
      typeof data[field] !== "string"
    ) {
      return `${field} must be a string.`;
    }
  }

  return null;
}

function pickOfferFields(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  }

  if (typeof data.buttonLink === "string") {
    const link = data.buttonLink.trim();

    // Only permit local paths or HTTPS destinations.
    if (
      !link.startsWith("/") ||
      link.startsWith("//")
    ) {
      if (!/^https:\/\//i.test(link)) {
        throw new Error(
          "Button link must be a local path or an HTTPS URL."
        );
      }
    }

    data.buttonLink = link;
  }

  return data;
}

// Public: active offers only.
export async function getActiveOffers(
  _req: Request,
  res: Response
) {
  try {
    const offers = await Offer.find({ active: true })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    console.error("getActiveOffers:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load offers.",
    });
  }
}

// Admin: all offers, including inactive ones.
export async function getAllOffers(
  _req: Request,
  res: Response
) {
  try {
    const offers = await Offer.find({})
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    console.error("getAllOffers:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load offers.",
    });
  }
}

// Admin: create.
export async function createOffer(
  req: Request,
  res: Response
) {
  try {
    const validationError = validateOfferBody(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const data = pickOfferFields(req.body);

    const offer = await Offer.create(data);

    return res.status(201).json({
      success: true,
      message: "Offer created successfully.",
      data: offer,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Button link")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("createOffer:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create offer.",
    });
  }
}

// Admin: update.
export async function updateOffer(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID.",
      });
    }

    const validationError = validateOfferBody(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const data = pickOfferFields(req.body);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields supplied for update.",
      });
    }

    const offer = await Offer.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Offer updated successfully.",
      data: offer,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Button link")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("updateOffer:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update offer.",
    });
  }
}

// Admin: delete.
export async function deleteOffer(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid offer ID.",
      });
    }

    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Offer deleted successfully.",
      data: { id: String(offer._id) },
    });
  } catch (error) {
    console.error("deleteOffer:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete offer.",
    });
  }
}