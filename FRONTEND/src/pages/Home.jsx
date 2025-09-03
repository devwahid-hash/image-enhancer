import { motion } from "framer-motion";
import { Sparkles, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../redux/userSlice";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../main";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [previewImage, setpreviewImage] = useState("");
  const [enhnacedImage, setenhnacedImage] = useState("");
  const [file, setfile] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      setfile(selectedFile);
      setpreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (!file) {
      alert("Please select an image first!");
      return;
    }

    try {
      // 1️⃣ Upload image to backend
      const formData = new FormData();
      formData.append("image_url", file);

      const uploadRes = await axios.post(
        `${serverURL}/api/enhanceimage`,
        formData,
        { withCredentials: true }
      );

      if (!uploadRes.data.success) {
        setisLoading(false);
        return alert("Upload failed");
      }

      const taskId = uploadRes.data.taskId;

      // 2️⃣ Poll backend for result
      let resultUrl = null;
      for (let i = 0; i < 10; i++) {
        const resultRes = await axios.get(
          `${serverURL}/api/enhance-result/${taskId}`
        );

        if (resultRes.data.success && resultRes.data.url) {
          resultUrl = resultRes.data.url;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      if (resultUrl) {
        setenhnacedImage(resultUrl);
      } else {
        alert("Enhancement still processing, try again later.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center px-6 py-10">
      {/* Navbar */}
      <nav className="w-full border-b border-gray-800 bg-gray-900/70 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-indigo-400">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>ImageEnhancer</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                dispatch(setuserData(null));
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-white">AI Image Enhancer</h1>
        <p className="text-gray-400 mt-2">
          Upload your image and see the magic of AI enhancement ✨
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-gray-900/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Upload Area */}
        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition"
        >
          <Upload className="w-12 h-12 text-indigo-400 mb-4" />
          <p className="text-gray-300">Drag & Drop your image here</p>
          <span className="text-gray-500 text-sm mt-1">or click to browse</span>
          <input
            onChange={handleFileChange}
            id="file-upload"
            accept="image/*"
            type="file"
            className="hidden"
          />
        </label>

        {/* Preview & Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Original Image Preview */}
          <div className="flex flex-col items-center">
            <h3 className="text-gray-300 mb-3">Original Image</h3>
            <div className="w-full h-64 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-500">
              {previewImage === "" ? (
                <span>No Image uploaded</span>
              ) : (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Enhanced Image Preview with Loader */}
          <div className="flex flex-col items-center">
            <h3 className="text-gray-300 mb-3">Enhanced Image</h3>
            <div className="w-full h-64 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-500 relative">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                  ></motion.div>
                  <p className="mt-3 text-indigo-400 text-sm animate-pulse">
                    Enhancing your image...
                  </p>
                </div>
              ) : enhnacedImage ? (
                <img
                  src={enhnacedImage}
                  alt="Enhanced View"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>Upload an Image to Enhance</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <form
          onSubmit={(e) => {
            formHandler(e);
          }}
          className="flex justify-center mt-8 gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            Upload & Enhance
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-semibold hover:bg-gray-700 transition cursor-pointer"
            disabled={!enhnacedImage}
            onClick={() => {
              if (enhnacedImage) {
                const link = document.createElement("a");
                link.href = enhnacedImage;
                link.download = "enhanced-image.jpg";
                link.click();
              }
            }}
          >
            Download Result
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/70 backdrop-blur-lg py-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} ImageEnhancer. Built with ❤️ by Wahid
          Dev.
        </p>
        <div className="flex justify-center mt-2 gap-4">
          <a
            href="https://github.com/devwahid-hash"
            className="hover:text-indigo-400"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/wahid-ali-4b5bb830b/"
            className="hover:text-indigo-400"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
