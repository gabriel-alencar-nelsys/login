import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    TextField,
    Typography,
    Stack
  } from "@mui/material";
  
  export const Main = () => {
    return (
      <Stack direction={'row'} sx={{ height: '100vh' }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={'60%'}
          sx={{
            backgroundImage: "url(https://www.papocarreira.com.br/wp-content/uploads/2019/07/bump-collaboration-colleagues-1068523-1024x670.jpg)",
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            borderRadius:'10px',
          
          }}
          padding={2}
        >
        </Box>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          width={'40%'}
          padding={2}
        >
         <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', // Aumentando a sombra
            borderRadius: '15px',
            backgroundColor: "#fff"
          }}
        >
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Bem Vindo de Volta! 😊🚀
              </Typography>
              <FormControl component={"form"} fullWidth>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  sx={{ borderRadius: "10px" }}
                  slotProps={{
                    input: {
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "white",
                      },
                    },
                  }}
                />
                <TextField
                  label="Senha"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  sx={{ borderRadius: "10px" }}
                  inputProps={{
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                  }}
                />
                <Button
                  sx={{
                    background: "orange",
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 2,
                    '&:hover': {
                      background: 'darkorange',
                    }
                  }}
                >
                  Login
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    );
  };
  