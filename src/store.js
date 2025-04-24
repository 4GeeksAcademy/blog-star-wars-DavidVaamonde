export const initialStore=()=>{
  return {
    favourites: []
  }

}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_favourite':

      return {
        ...store,
        favourites: [...store.favourites, action.payload],
      }

    case 'remove_favourite':

      return {
        ...store,
        favourites: store.favourites.filter(
          (item) => item.uid !== action.payload
        )
      };

    default:
      throw Error('Unknown action.');
  }
}
