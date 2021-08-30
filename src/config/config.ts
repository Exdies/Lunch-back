require("dotenv").config();

export default {
  jwtSecret: process.env.JWS_SECRET || "",
  DB: {
    MONGO_DATABASE: process.env.MONGO_DATABASE || "",
    MONGO_USER: process.env.MONGODB_USER || "",
    MONGO_PASSWORD: process.env.MONGODB_PASSWORD || "",
    PORT: process.env.PORT || 3001,
  },
};
