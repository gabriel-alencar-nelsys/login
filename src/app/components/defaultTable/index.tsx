"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const tableBackgroundImage =
  'url("https://cdn.1min30.com/wp-content/uploads/2018/11/Game-of-Thrones-logo.jpg")';

export default function Initial() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState({});

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

  const fetchMembers = async (houseId) => {
    if (!members[houseId]) {
      try {
        const response = await axios.get(
          `http://177.153.58.221:9998/ms-got/houses/${houseId}/members`
        );
        setMembers((prevMembers) => ({
          ...prevMembers,
          [houseId]: response.data,
        }));
      } catch (error) {
        toast.error("Erro ao buscar membros");
      }
    }
  };

  if (error) return <Typography color="error">Erro ao buscar dados</Typography>;
  if (loading) return <Typography>Carregando dados...</Typography>;

  return (
    <Stack spacing={2} alignContent={"center"} justifyContent={"center"}>
      <Accordion>
        <AccordionSummary
          sx={{ alignItems: "center", justifyContent: "center" }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            fontWeight={"bold"}
            sx={{
              color: "#444",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
            variant="h5"
          >
            Casas de Game of Thrones
          </Typography>
        </AccordionSummary>
        <Typography
          fontWeight={"bold"}
          sx={{ color: "#444" }}
          variant="h6"
          align="center"
        >
          Filtros:
        </Typography>
        <Stack direction={"row"}>
          <TextField sx={{ background: "#fff" }} label="House"></TextField>
          <TextField label="Nome"></TextField>
          <TextField label="ID"></TextField>
          <Button sx={{ background: "black", color: "white" }}>Filtrar</Button>
        </Stack>
        <AccordionDetails>
          <Stack spacing={1}>
            {houses.map((house) => {
              const houseId = house.links[0].href.split("/").pop();
              return (
                <Accordion key={houseId} onChange={() => fetchMembers(houseId)}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{house.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1} width="100%">
                      {members[houseId] ? (
                        <>
                          <Typography variant="subtitle1">Membros</Typography>
                          <TableContainer
                            component={Paper}
                            sx={{
                              backgroundImage: tableBackgroundImage,
                              backgroundSize: "cover",
                              color: "#00ffd1",
                            }}
                          >
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell style={{ color: "#00ffd5" }}>
                                    ID
                                  </TableCell>
                                  <TableCell style={{ color: "#00ffd5" }}>
                                    Nome
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {members[houseId].length > 0 ? (
                                  members[houseId].map((member) => (
                                    <TableRow key={member.links[0].href}>
                                      <TableCell style={{ color: "#00ffd1" }}>
                                        {member.links[0].href.split("/").pop()}
                                      </TableCell>
                                      <TableCell style={{ color: "#00ffd1" }}>
                                        {member.name}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={2}>
                                      Nenhum membro encontrado para esta casa.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      ) : (
                        <Typography>Carregando membros...</Typography>
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
