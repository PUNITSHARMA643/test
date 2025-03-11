import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase, testConnection } from "./db/conn.mjs";  // Add testConnection import
import authRouter from "./routes/authRouter.mjs";
import syllabusRouter from "./routes/syllabusRouter.mjs";
import testRouter from "./routes/testRouter.mjs";
import questionRouter from "./routes/questionRouter.mjs";
import takeTestRouter from "./routes/takeTestRouter.mjs";
// ... rest of the imports ...

const port = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method}\t ${new Date().toLocaleString()}\t ${req.url}`);
  next();
});

// Test database connection before setting up routes
await testConnection().catch(console.error);

// routes
app.get("/", (req, res) => {
  res.send("Authentication Server");
});
app.use("/api/auth", authRouter);
app.use("/api/syllabus", syllabusRouter);
app.use("/api/tests", testRouter);
app.use("/api/questions", questionRouter); // Use the question router
app.use("/api/take-test", takeTestRouter); // Add this line

// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server");
        return;
      }
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });