import { inject, observer } from 'mobx-react';
import { Text } from '../components/Themed';

const getStore = ( {store}:any ) => { 
    return(<Text>xxx</Text>)
}
export default inject(({store}) => ({store}))(observer(getStore))