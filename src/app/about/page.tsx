"use client";

import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Initial() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [houses, setHouses] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://177.153.58.221:9998/ms-got/houses"
        );
        setData(response.data);
        console.log("Data", response.data);
      } catch (error) {
        toast.error("Erro ao buscar dados");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return toast.error("Erro ao Buscar Dados");

  if (!data) return toast.loading("Carregando Dados!");

  return (
    <Stack>
      <Typography>Casas do Game Of Thrones</Typography>
   
        {houses.map((house, index) => (
          <Typography> key={index} > {house.name} </Typography>
        ))}
      
    </Stack>
  );
}
