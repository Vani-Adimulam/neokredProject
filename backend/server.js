const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { marked } = require("marked");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/get", (req, res) => {
    console.log("Hello")
    res.json("Hello World")
})

const text = "# Heading"
const text1 = marked(text)
console.log(text1)

app.post("/convert", (req, res) => {
    const {markdown} = req.body;
    console.log(req.body)
    if (!markdown) {
        // Throwing error if markdown is empty
        return res.statusCode(400).json({error: "Markdown text is Needed."})
    }
    // Converting Markdown text to html using marked
    const htmlTextConversion = marked(markdown)
    res.json({htmlTextConversion});
})


app.listen(PORT, () => {
    console.log(`Backend is running in PORT ${PORT}`)
})





















