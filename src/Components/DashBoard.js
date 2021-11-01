import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import LinearProgress from '@mui/material/LinearProgress';
import FeedBackAlert from "./FeedBackAlert";
import CustomAppBar from "./CustomAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//pop up dialog
import PopUpForm from "./PopUpForm";

const theme = createTheme();

export default function Album() {
  const [err, setErr] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [responseObject, setResponseObject]=useState({});
  //control pop up
  const [formOpen, setFormOpen] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  //Alert
  const [openAlert, setOpenAlert] = useState(false);
  //Update
  const [classInfo, setClassInfo] = useState({});

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };
  //test
  const handleOpenForm = () => {
    setFormOpen(true);
  };
  const handleCloseForm = () => {
    setFormOpen(false);
    setFormErr(false);
    setClassInfo({});
  };
  const handleChange = ()=>{
    setFormErr(false);
  }
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    const className = document.querySelector("#className").value;
    console.log(className);
    console.log("Submited!", className);
    if(!className) {
      setFormErr(true);
      return
    }
    else{
      const formNodes = document.querySelectorAll("#myform input");
      const formData = new URLSearchParams();
      formNodes.forEach(ele=>formData.append(ele.name,ele.value));
      const postForm = async()=>{
        try{
          const responseFromPost = await fetch("http://localhost:5000/api/classes",{method:"POST", body: formData})
          const response = await responseFromPost.json();
          console.log("Di vao phan text\n", response);
          setFormOpen(false);
          setResponseObject(response);
          setOpenAlert(true);
          setReFetch(!reFetch);
        }
        catch(error){
          console.log("Di vao phan catch\n", error)
          setErr(error);
        }
      }
      postForm();
    }
  }
  const fetchInfoOfAClass = async(classID)=>{
    try{
      const responseFromGet = await fetch(`http://localhost:5000/api/classes/${classID}`)
      const response = await responseFromGet.json();
      setClassInfo(response);
      setFormOpen(true);
    }
    catch(error){
      console.log("Da xay ra loi", error);
      setErr(error);
    }
  }

  const sleep = (ms)=>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  useEffect(() => {
    const doFetch = async () => {
      setIsLoaded(false);
      await sleep(1000);
      try {
        const fetchedData = await fetch("http://localhost:5000/api/classes");
        const data = await fetchedData.json();
        setIsLoaded(true); 
        setClasses(data);
      } catch (error) {
        setIsLoaded(true);
        setErr(error);
      }
    };
    doFetch();
  }, [reFetch]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar/>
      <div>
        {/* Hero unit */}
        <Box
          sx={{
            //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            bgcolor: "background.paper",
            pt: 8,
            // pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Classroom Dashboard
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <div>
                <Button variant="outlined" onClick={handleOpenForm}>
                  Create a class
                </Button>
                <PopUpForm 
                  formName="Create a class"
                  actionName="Create"
                  open={formOpen}
                  handleClose={handleCloseForm}
                  handleSubmit={handleSubmit}
                  formErr={formErr}
                  handleChange={handleChange}
                  classInfo={classInfo}
                />
              </div>
              <Button variant="outlined">Join a class</Button>
            </Stack>
            <FeedBackAlert openAlert={openAlert} messageObject={responseObject} onCloseAlert={handleCloseAlert}></FeedBackAlert>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          {err ? (
            <Typography
              component="div"
              variant="h6"
              align="center"
              color="error"
              gutterBottom
            >
              Error: {err.message}
            </Typography>
          ) : !isLoaded ? (
            <>
              <LinearProgress />
              <LinearProgress sx={{my:"10px"}}/>
              <LinearProgress />
            </>
          ) : (
            <Grid container spacing={5}>
              {classes.map((ele, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "25px",
                      "&:hover": {
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      },
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        background: `url(https://picsum.photos/300/200?random=${ele.id})`,
                        height: "200px",
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  padding: "20px 10px",
                                  background: "inherit",
                                  overflow: "hidden",
                                  "&::before":{content: '""',
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              width: "200%",
                                              height: "200%",
                                              background: "inherit",
                                              WebkitFilter: "blur(4px)",
                                              filter: "blur(4px)"},
                                  "&::after":  {content: '""',
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              width: "100%",
                                              height: "100%",
                                              background: "rgba(0, 0, 0, 0.3)"}
                                }}
                      >
                        <Typography
                          variant="h5"
                          sx={{margin: 0,
                            color: "background.paper",
                            position: "relative",
                            zIndex: 1}}
                        >
                          {ele.className}
                        </Typography>
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography>
                        <strong>Section: </strong>
                        {ele.classSection}
                        <br />
                        <strong>Subject: </strong>
                        {ele.subject}
                        <br />
                        <strong>Room: </strong>
                        {ele.room}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small" onClick={()=>fetchInfoOfAClass(ele.id)}>Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}
