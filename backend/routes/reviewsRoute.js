import express from "express";
import { Review } from "../models/reviewModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.reviewText ||
      !request.body.rating
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, reviewText, rating",
      });
    }

    const newReview = {
      title: request.body.title,
      author: request.body.author,
      reviewText: request.body.reviewText,
      rating: request.body.rating,
    };

    const createdReview = await Review.create(newReview);

    return response.status(201).send(createdReview);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const reviews = await Review.find({});

    return response.status(200).json({
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const review = await Review.findById(id);

    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response.status(200).json(review);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.reviewText ||
      !request.body.rating
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, reviewText, rating",
      });
    }

    const { id } = request.params;

    const result = await Review.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response
      .status(200)
      .send({ message: "Review updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Review.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response
      .status(200)
      .send({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
