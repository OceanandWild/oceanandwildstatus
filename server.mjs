import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const slackWebhook = "https://hooks.slack.com/services/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";

// Ruta GET para la raíz
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

app.post("/send-to-slack", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch(slackWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error("Error al enviar a Slack");
        }

        res.status(200).json({ success: true, message: "Notificación enviada a Slack" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
