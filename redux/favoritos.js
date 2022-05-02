import * as ActionTypes from './ActionTypes';

export const favoritos = (state = {favoritos: []}, action) => {

    switch (action.type) {

        case ActionTypes.ADD_FAVORITO:

            let existe = 0;
            //HACERLO CON UN FOR
            /*favoritos.map( element => 
                {if(element===action.payload){
                    existe = 1;
                }}
            )*/
            if(existe===0){//comprobar que no exista ya
                return {...state, favoritos: action.payload};
            }else{
                return state;
            }

        default:
        return state;
    }
};



