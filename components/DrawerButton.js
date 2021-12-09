import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';

const DrawerButton = props => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu' 
                iconName='ios-menu' 
                onPress={() => {props.navigation.toggleDrawer()}} />
        </HeaderButtons>
    );
};

export default DrawerButton;