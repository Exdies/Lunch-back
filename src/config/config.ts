export default {
  jwtSecret: process.env.JWS_SECRET || "supersecrettoken",
  DB: {
    MONGO_DATABASE: process.env.MONGODB_USER || "launch-app-db",
    MONGO_USER: process.env.MONGODB_USER || "usertest",
    MONGO_PASSWORD: process.env.MONGODB_PASSWORD || "newpassword123",
  },
};
