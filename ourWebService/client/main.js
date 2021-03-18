import './main.html';
import { HTTP } from 'meteor/http'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.main.onCreated(function mainOnCreated() {
  let ctrl = this;
  this.movies = new ReactiveVar();

  HTTP.call('GET', 'http://localhost:3000/api/movies',{}, 
  function(error, response){ ctrl.movies.set(JSON.parse(response.content).results); });
});

Template.main.helpers({
  movies() { return Template.instance().movies.get(); },
});

Template.main.events({
  'click .like'(event, instance) {
    var idMovie = $(event.target).data('id');
    HTTP.call('PUT', 'http://localhost:3000/api/like/'+idMovie,{}, 
    function(error, response){
        var json = JSON.parse(response.content);
        var countLike = document.getElementById("count_"+json.id);
        countLike.innerHTML = json.like;
    });
  },
  'click .change'(event, instance) {
    var changebt = document.getElementById("changebt");
    if(changebt.innerHTML == "See TV Series") {
      changebt.innerHTML = "See Movies"
      HTTP.call('GET', 'http://localhost:3000/api/tvSeries',{}, 
      function(error, response){ instance.movies.set(JSON.parse(response.content).results); });
    } else {
      changebt.innerHTML = "See TV Series"
      HTTP.call('GET', 'http://localhost:3000/api/movies',{}, 
      function(error, response){ instance.movies.set(JSON.parse(response.content).results); });
    }
  },
  'click .img'(event, instance) {
    var idMovie = $(event.target).data('id');
    var newUrl = ""
    HTTP.call('GET', 'http://localhost:3000/api/movie/video/'+idMovie,{},
    function(error, response){
      var json = JSON.parse(response.content);
      var key = json.results[0].key
      newUrl = "https://www.youtube.com/embed/" + key + "?autoplay=1"
      var mainIframe = document.getElementById("mainIframe");
      mainIframe.style.visibility = "visible";
      var insideIframe = document.getElementById("insideIframe");
      insideIframe.src = newUrl
      window.location.href = "http://localhost:3000/#title";
    });
  },
  'click .quit'(event, instance) {
    var mainIframe = document.getElementById("mainIframe");
    mainIframe.style.visibility = "hidden";
  },
});