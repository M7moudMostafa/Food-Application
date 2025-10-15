import fs from 'fs/promises';
import path from 'path';

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// Resolve the database file from the project root to work reliably in serverless
// function environments where the CWD can differ.
const dbFilePath = path.join(process.cwd(), 'meals.db');
const db = sql(dbFilePath);

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error("Error when Loading meals")
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    if (!meal.image || !meal.image.name) {
        throw new Error('Invalid image uploaded');
    }

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = Buffer.from(await meal.image.arrayBuffer());
    const imageOutputPath = path.join(process.cwd(), 'public', 'images', fileName);
    await fs.writeFile(imageOutputPath, bufferedImage);

    meal.image = `/images/${fileName}`;

    db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}