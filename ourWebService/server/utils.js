import { SERVER_CONFIG } from './server.config'
import { tpwebservices } from './main.js'

export const utils = {
    "createMoviedbUrl" : createMoviedbUrl,
    "getIdMOviePathParams" : getIdMOviePathParams,
    "update" : update
}

function createMoviedbUrl(){
    let url;
    var key = arguments[0]
    var key2 = arguments[1]
    var id = arguments[2]
    switch(key){
        case 'discover':
            url = SERVER_CONFIG.themovidb_api_config.base_url + 'discover/' + key2 + '?api_key=' + SERVER_CONFIG.themovidb_api_config.api_key + '&language=' + SERVER_CONFIG.themovidb_api_config.language
            break;
        case 'videos':
            url = SERVER_CONFIG.themovidb_api_config.base_url + key2 + '/' + id + '/videos?api_key=' + SERVER_CONFIG.themovidb_api_config.api_key + '&language=' + SERVER_CONFIG.themovidb_api_config.language
            break;
        default:
            break;
    }
    return url;
}

function getIdMOviePathParams(url){
    var id = url.split('/')[1];
    return id;
}

function update(id){
    let dbData = tpwebservices.findOne({ id: id })

    if(dbData) {
      tpwebservices.update({ _id: dbData._id }, { $inc: {like: 1}})
    } else {
      tpwebservices.insert({ id: id, like: 1 })
    }
    return tpwebservices.findOne({ id: id })
}
