import { Button, CircularProgress, TextField } from "@mui/material";
import "./homepage.css";
import axios from "axios";
import { useState } from "react";

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

  return (
    <div
      style={{
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
      <span className="elementTitle">{element.name}</span>
      <br />
      <br />
      <span className="elementPrice">
        Precio: ${element.price.toLocaleString()}
      </span>
    </div>
  );
};

export default function Homepage() {
  const handleSubmit = async () => {
    // armar url
    const url = `http://localhost:8080/api/mercadolibre?ram=${ram}&inches=${screen}&storage=${storage}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`;
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

      {results.length ? (
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
