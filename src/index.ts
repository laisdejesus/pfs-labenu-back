import app from "./app"
import signup from './endpoints/signup'
import login from "./endpoints/login";
// import myProfile from "./endpoints/myProfile";
// import yourProfile from "./endpoints/yourProfile";
import createMusic from "./endpoints/createMusic";
import getAllMusics from "./endpoints/getAllMusics";

app.post('/user/signup', signup);
app.post('/user/login', login);
app.get('/music/all', getAllMusics);
// app.get('/user/:id', yourProfile);
app.post('/music/create', createMusic);
// app.get('/recipe/:id', getRecipe);