import {combineReducers} from 'redux';
import {persistReducer} from'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig={
    key:'root',
    storage,
    whitelist:['cart']//user persisted by firebase so no need to add here
}

const rootReducer=combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory:directoryReducer,
    shop:shopReducer
});

export default persistReducer(persistConfig ,rootReducer)
