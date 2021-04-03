import {createSelector} from 'reselect';

const selectShop=state=>state.shop;

export const  selectCollections=createSelector(
    [selectShop],
    shop=>shop.collections
);

export const selectCollectionsForPreview=createSelector(
    [selectCollections],
    collections=>Object.keys(collections).map(key=>collections[key])
)//return array because map called on the array,array returned

export const selectCollection=collectionUrlParam=>
    createSelector(
        [selectCollections],
        collections=>collections[collectionUrlParam]
    );//here juz obj[prop] used so object itself is returned..not an array