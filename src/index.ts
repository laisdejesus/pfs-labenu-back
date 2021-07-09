import app from "./app"
import signup from './endpoints/signup'
// import login from "./endpoints/login";
// import myProfile from "./endpoints/myProfile";
// import yourProfile from "./endpoints/yourProfile";
// import createRecipe from "./endpoints/createRecipe";
// import getRecipe from "./endpoints/getRecipe";

app.post('/user/signup', signup);
// app.post('/login', login);
// app.get('/user/profile', myProfile);
// app.get('/user/:id', yourProfile);
// app.post('/recipe', createRecipe);
// app.get('/recipe/:id', getRecipe);