import {ChangeEvent, useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {Button, Stack, TextField} from "@mui/material";

function App() {
    const [image, setImage] = useState<string | null>(null); // Stav pro uloženou fotku

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Získání vybraného souboru
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string); // Uložení náhledu obrázku
            };
            reader.readAsDataURL(file); // Převod obrázku na base64
        }
    };

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Stack spacing={2}>
                    <TextField
                        id="filled-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                    />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Take a photo
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange} // Volání při výběru souboru
                        />
                    </Button>
                </Stack>

                {/* Zobrazení náhledu obrázku */}
                {image && (
                    <div style={{marginTop: "20px"}}>
                        <h3>Preview:</h3>
                        <img
                            src={image}
                            alt="Captured"
                            style={{maxWidth: "100%", height: "auto", borderRadius: "8px"}}
                        />
                    </div>
                )}

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
