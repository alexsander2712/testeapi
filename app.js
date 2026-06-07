import express from "express";
import cors from "cors";
import sneakersRoutes from "./router/sneakers.js";

const app = express();

// middlewares básicos
app.use(cors());
app.use(express.json());

// rota principal da API
app.use("/sneakers", sneakersRoutes);

// rota raiz (só pra não parecer quebrado)
app.get("/", (req, res) => {
  res.send("API de Sneakers rodando");
});

// porta
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});