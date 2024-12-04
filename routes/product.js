import express from "express";
import db from "../configs/db.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// 獲得全部商品
router.get("/getAllProduct", async function (req, res, next) {
	const sql = "SELECT * FROM Product";

	try {
		const [rows, failed] = await db.query(sql);
		console.log(rows);
		res.json({
			result: "success",
			data: rows,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			result: "get product failed",
			message: "Error:" + err,
		});
	}
});

router.put("/updateProduct", async function (req, res, next) {
  const { ID, Name, OriginPrice } = req.body;
  const sql = "UPDATE Product SET Name = ?, Price = ? WHERE ID = ?";

  try {
    const [rows, failed] = await db.query(sql, [Name, OriginPrice, ID]);
    console.log(rows);
    res.json({
      result: "success",
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      result: "failed",
      message: "Error:" + err,
    });
  }
});

router.get("/:id", async function (req, res, next) {
	const { id } = req.params;
	const sql = "SELECT * FROM Product WHERE ID = ?";

	try {
		const [rows, failed] = await db.query(sql, [id]);
		console.log(rows[0]);
		res.json({
			result: "success",
			data: rows[0],
		});
	} catch (err) {
		res.status(500).json({
			result: "failed",
			message: "Error:" + err,
		});
	}
});

export default router;
