import { utils } from './utils';
import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { localData } from './localData.js';

const localhost= 'http://localhost:3000'
export const tpwebservices = new Mongo.Collection('tpwebservices')

// code to run on server at startup
Meteor.startup(() => {});

WebApp.connectHandlers.use('/json',(req,res,next) => {
  res.writeHead(200);
  res.end(JSON.stringify(localData));
});

WebApp.connectHandlers.use('/api/movies',(req,res,next) => {
  HTTP.call('GET', utils.createMoviedbUrl('discover','movie'), {},
  function(error, response){
    res.writeHead(200);
    res.end(JSON.stringify(response.data));
  });
});

WebApp.connectHandlers.use('/api/like/',(req,res,next) => {
  let result;

  switch ( req.method){
    case 'GET': 
      break;
    case 'PUT':
      // Récuperation de l'id movie dans les param de l'url
      const idmovie = utils.getIdMOviePathParams(req.url);
      // récupère ou initialise la ressource
      result = utils.update(parseInt(idmovie));
      // Succès on renvoie dans la nouvelle ressource
      res.writeHead(200)
      res.write(JSON.stringify(result))
      break;
    default:
      break;
  }
  res.end();
});

WebApp.connectHandlers.use('/api/tvSeries',(req,res,next) => {
  HTTP.call('GET', utils.createMoviedbUrl('discover','tv'), {},
  function(error, response){
    res.writeHead(200);
    res.end(JSON.stringify(response.data));
  });
});

WebApp.connectHandlers.use('/api/movie/video/',(req,res,next) => {
  const id = utils.getIdMOviePathParams(req.url);
  HTTP.call('GET', utils.createMoviedbUrl('videos','movie',id), {},
  function(error, response){
    res.writeHead(200);
    res.end(JSON.stringify(response.data));
  });
});