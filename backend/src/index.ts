import 'dotenv/config';
import express from "express";
import { influencers } from "./routes/influencers.js";
import { campaigns } from "./routes/campaigns.js";
import { sales } from "./routes/sales.js";
import { reports } from "./routes/reports.js";
// import { startListener } from "./services/listener.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());                // -> Access-Control-Allow-Origin: *


app.use("/influencers", influencers);
app.use("/campaigns", campaigns);
app.use("/sales", sales);
app.use("/reports", reports);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API on :${port}`));

