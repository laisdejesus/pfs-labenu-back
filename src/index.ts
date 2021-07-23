import app from "./app"
import signup from './endpoints/signup'
import login from "./endpoints/login";
import getAllGenres from "./endpoints/getAllGenres";
import createMusic from "./endpoints/createMusic";
import getAllMusics from "./endpoints/getAllMusics";
import getMusicById from "./endpoints/getMusicById";

app.post('/user/signup', signup);
app.post('/user/login', login);
app.post('/music/create', createMusic);
app.get('/music/all', getAllMusics);
app.get('/music/:id', getMusicById);
app.get('/genres', getAllGenres);