
import type { Request, Response, NextFunction } from "express";
import Project from "../models/Project";

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : undefined;

    const featured = req.query.featured;
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const filter: Record<string, unknown> = {
      status: "published",
    };

    if (
      category &&
      category !== "All Projects"
    ) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (search) {
      const escaped = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { tags: { $regex: escaped, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter)
      .select(
        "title slug category categoryLabel description image tags visual number href liveUrl featured sortOrder"
      )
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectBySlug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: "published",
    })
      .select("-__v")
      .lean();

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}
