import React from 'react';
// import { render } from 'react-dom';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {updateCollections} from '../../redux/shop/shop.actions';

import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner=WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner=WithSpinner(CollectionPage);
class ShopePage extends React.Component{
    state={
        loading:true
    };
    unsubscribeFromSnapshot=null;

    componentDidMount(){
        const {updateCollections}=this.props;
        const collectionRef=firestore.collection('collections');
         //observable observer pattern
        // this.unsubscribeFromSnapshot=collectionRef.onSnapshot(async snapshot =>{
        //     const collectionsMap=convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);   
        //     this.setState({loading:false})     
        // })

        //same functionality,different pattern(promise)
        collectionRef.get().then(snapshot =>{
                const collectionsMap=convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);   
                this.setState({loading:false})     
            })

        //native fetch 
        // fetch('https://firestore.googleapis.com/v1/projects/e-commerce-site-db/databases/(default)/documents/collections')
        // .then(response=>response.json())
        // .then(collections=>console.log(collections))//extremely nested so not actually implemented but method understood
    }

    render(){
        const {match}=this.props;
        const {loading}=this.state;
        return(<div className='shop-page'>
            <Route exact path ={`${match.path}`} 
                    render={(props)=>(<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)}
            />
            <Route path ={`${match.path}/:collectionId`} render={(props)=>(<CollectionPageWithSpinner isLoading={loading} {...props}/>)}/>
        </div>)
    }
};


const mapDispatchToProps=dispatch=>({
    updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopePage);