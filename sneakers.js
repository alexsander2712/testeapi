import express from "express";
import fs from "fs";

const router = express.Router();
const FILE = "./data.json";

// função pra ler
const readData = () => {
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
};

// função pra escrever
const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};


// GET - listar
router.get("/", (req, res) => {
  const sneakers = readData();
  res.json(sneakers);
});


// GET por SKU
router.get("/:sku", (req, res) => {
  const sneakers = readData();

  const sneaker = sneakers.find(
    s => s.id_sku_global === req.params.sku
  );

  if (!sneaker) {
    return res.status(404).json({ error: "Não encontrado" });
  }

  res.json(sneaker);
});


// POST - criar
router.post("/", (req, res) => {
  const sneakers = readData();
  const data = req.body;

  if (!data.id_sku_global) {
    return res.status(400).json({ error: "SKU obrigatório" });
  }

  const exists = sneakers.find(
    s => s.id_sku_global === data.id_sku_global
  );

  if (exists) {
    return res.status(409).json({ error: "Já existe" });
  }

  sneakers.push(data);
  writeData(sneakers);

  res.status(201).json({
    message: "Salvo no JSON (olha só)",
    data
  });
});

export default router;