import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const enhancedImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("📂 Received file:", req.file.path);

    const imagePath = req.file.path;
    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(imagePath));

    // 1️⃣ Send to PicWish
    const createRes = await axios.post(process.env.PICWISH_POST, formData, {
      headers: {
        "X-API-KEY": process.env.API_KEY,
        ...formData.getHeaders(),
      },
    });

    console.log("✅ PicWish response:", createRes.data);

    // Extract task ID
    const taskId = createRes.data.data.task_id;

    // Send taskId back to frontend
    res.json({ success: true, taskId });
  } catch (error) {
    console.error("❌ PicWish error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Enhancement failed" });
  }
};


export const getEnhancedImage = async (req, res) => {
  const { taskId } = req.params;
   console.log(taskId)
  try {
    const resultRes = await axios.get(
      `${process.env.PICWISH_GET}/api/tasks/visual/scale/${taskId}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );

    console.log("📥 PicWish result:", resultRes.data);

    // ✅ Check proper fields
    if (resultRes.data.status === 200 && resultRes.data.data?.image) {
      return res.json({
        success: true,
        url: resultRes.data.data.image,
      });
    } else {
      return res.json({
        success: false,
        message: "Still processing",
      });
    }
  } catch (error) {
    console.error("❌ PicWish result error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to fetch result" });
  }
};
