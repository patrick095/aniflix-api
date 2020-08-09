# aniflix-backend

Node.js


links without having to log in

GET: URL/animes?page=1 - Show first page with 10 animes
POST: URL/signup - link to sign up (need send json with name,user,email,password)
POST: URL/signin - link to sign in (need send json with user and password)
POST: URL/update - link to change money and level of users (need send json with user, password and update object to change users money and level, need to have account 
level 1 to change money and level 2 to change level)

links with having to logged in

POST: URL/animes/newanime - link to create a new anime (need send json with
name: string,
englishName: string,
genre: string,
episodes: arrayOfObjects {name,url,description,season},
seasons: arrayOfStrings,
ovas: arrayOfObjects {name,url,description},
movies: arrayOfObjects {name,url,description},
situation: string,
year: number,
launchDay: string,
director: string,
studio: string

POST: URL/animes/editanime - link to edit a existent anime (need send a json with all to need to be edited, and need to be a level 1)
DEL: URL/animes/deleteanime - link to delete a existent anime (need send a json with the name of anime, and need to be a level 2)
