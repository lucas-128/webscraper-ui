import { Button, CircularProgress, TextField } from "@mui/material";
import "./homepage.css";
import axios from "axios";
import { useState } from "react";

const FRAVEGA =
  "data:image/png;base64,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";
const MERCADOLIBRE =
  "https://pbs.twimg.com/profile_images/1609904580472496130/qEZkjppS_400x400.jpg";
const FULLHARD = "https://www.fullh4rd.com.ar/assets/logo_black.png";
const NOTFOUND =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AImage-not-found.png&psig=AOvVaw3Cz3cdZBkT30doJnvOKo7-&ust=1700850111731000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCWzMfe2oIDFQAAAAAdAAAAABAT";

type Element = {
  name: string;
  price: number;
  url: string;
};

interface CardProps {
  element: Element;
}

const Card: React.FC<CardProps> = ({ element }) => {
  const [isHovered, setHovered] = useState(false);

  const handleCardClick = () => {
    window.open(element.url, "_blank", "noopener noreferrer");
  };

  const getLogoImage = () => {
    if (element.url.includes("fullh4rd")) {
      return FULLHARD;
    } else if (element.url.includes("mercadolibre")) {
      return MERCADOLIBRE;
    } else if (element.url.includes("fravega")) {
      return FRAVEGA;
    }
    return NOTFOUND; // Default or fallback image
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        margin: "10px",
        width: "1000px",
        backgroundColor: isHovered ? "#aaf" : "#ddd",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <span className="elementTitle">{element.name}</span>
        <br />
        <br />
        <span className="elementPrice">
          Precio: ${element.price.toLocaleString()}
        </span>
      </div>
      <img
        src={getLogoImage()}
        alt="Logo"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default function Homepage() {
  const handleSubmit = async () => {
    // armar url
    const url = `http://localhost:8080/api/general?ram=${ram}&inches=${screen}&storage=${storage}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&limit=${amount}&processor=${processor}`;
    console.log(url);

    try {
      const data = await axios.get(url);
      console.log(data.data);
      setResults(data.data);
    } catch (e) {
      //
    }
  };

  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [sort, setSort] = useState("");
  const [screen, setScreen] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [processor, setProcessor] = useState("");

  const [results, setResults] = useState<Element[]>([]);

  return (
    <div className="container">
      <h1 className="title">Web Scraper</h1>
      <div className="inputs-container">
        {/* First Row */}
        <div className="input-row">
          <div className="input-item">
            <span className="label">Max Price</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Min Price</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Limit</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Sort</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="input-row">
          <div className="input-item">
            <span className="label">Ram</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setRam(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Screen Size</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setScreen(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Storage</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setStorage(e.target.value)}
            />
          </div>

          <div className="input-item">
            <span className="label">Processor</span>
            <TextField
              variant="filled"
              className="textfield"
              onChange={(e) => setProcessor(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ flexDirection: "row", marginBottom: 20 }}>
        <Button
          style={{ marginRight: 10 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button variant="contained" onClick={() => setResults([])}>
          Clear
        </Button>
      </div>

      {results && results.length ? (
        <div>
          <div
            style={{
              overflowY: "scroll",
              maxHeight: "450px",
            }}
          >
            {results.map((element, index) => (
              <Card key={index} element={element} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 50 }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
