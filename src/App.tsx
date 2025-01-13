import { ChangeEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Stack, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";

interface IFormData {
  name: string;
  description: string;
}

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

  // Načtení dat z localStorage při inicializaci
  const loadFormData = () => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { name: "", description: "" };
  };

  // Uložení dat do localStorage
  const saveFormData = (values: { name: string; description: string }) => {
    localStorage.setItem("formData", JSON.stringify(values));
  };

  const clearFormData = () => {
    localStorage.removeItem("formData");
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Formik
          initialValues={loadFormData()}
          onSubmit={(_, { resetForm }) => {
            clearFormData();
            resetForm();
            alert("Formulář uložen!");
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  as={TextField}
                  id="name"
                  name="name"
                  label="Název"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    saveFormData({
                      ...values,
                      name: e.target.value,
                    } as IFormData); // Uložení při změně
                  }}
                />
                <Field
                  as={TextField}
                  id="description"
                  name="description"
                  label="Popis"
                  rows={4}
                  multiline
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    saveFormData({
                      ...values,
                      description: e.target.value,
                    } as IFormData); // Uložení při změně
                  }}
                />
                <Button variant="contained" component="label">
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
                <div style={{ marginTop: "20px" }}>
                  <h3>Preview:</h3>
                  <img
                    src={image}
                    alt="Captured"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Uložit formulář
              </Button>
            </Form>
          )}
        </Formik>

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
