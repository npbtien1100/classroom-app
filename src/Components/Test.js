import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

const theme = createTheme();
export default function Test() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography>Chu o day ne!</Typography>
    </ThemeProvider>
  );
}
