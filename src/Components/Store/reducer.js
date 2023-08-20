import * as actionTypes from './action';

const initialState = {
    pages: [],
    content: '',
}
const reducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.ADD_PAGE:
            return {
                ...state,
                pages: [...state.pages, action.payload.page],
              };
        case actionTypes.UPDATE_CONTENT:
            let updatedPages = state.pages.filter((p)=> {
                if (p.slug === action.payload.page){
                    p.content = action.payload.content;
                }
                return p;
            });
          return {
            ...state, pages: updatedPages,
          };
        default:
            return state;
    }
}

export default reducer;