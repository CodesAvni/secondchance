import { Router } from "express";
// @ts-ignore
import { GoogleGenAI } from "@google/genai";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Initialize the SDK (it automatically picks up process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({});

router.post("/generate-bio", protect, async (req: any, res: any) => {
  const { rawNotes } = req.body;

  if (!rawNotes || rawNotes.trim() === "") {
    return res.status(400).json({ message: "Please provide some notes first" });
  }

  try {
    // Using the fast, efficient gemini-2.5-flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert career advisor specializing in helping professionals return to the workforce after a career break (e.g., caregiving, family, career pivots). 

Take the following rough, fragmented notes written by a user and transform them into a cohesive, professional, and empowering summary (bio) suitable for a general job platform profile. 

Highlight transferable skills like organization, empathy, problem-solving, management, or administrative capabilities beautifully. Keep it under 3-4 sentences and write it in the first person ("I").

Rough notes: "${rawNotes}"`,
    });

    return res.json({ bio: response.text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ message: "Failed to generate bio with AI" });
  }
});

export default router;