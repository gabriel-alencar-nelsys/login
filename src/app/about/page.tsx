"use client";

import "../styles/global.css"; // Certifique-se de que o caminho esteja correto
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DefaultTable from "../components/DefaultTable";

export default function Initial() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://177.153.58.221:9998/ms-got/houses"
        );
        setHouses(response.data);
      } catch (error) {
        toast.error("Erro ao buscar dados");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <Typography color="error">Erro ao buscar dados</Typography>;
  if (loading) return <Typography>Carregando dados...</Typography>;

  return (
    <Stack spacing={2} margin={"10px"} marginTop={"30px"}>
      <Typography variant="h5" align="center" fontWeight={"bold"} color="white">
        Game of Thrones
      </Typography>
      <img
        src="/game.jpg"
        alt="Game of Thrones"
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius:'10px' }}
      />

      <DefaultTable data={houses} />
    </Stack>
  );
}
