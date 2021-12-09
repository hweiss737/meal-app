import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DrawerButton from '../components/DrawerButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{true: Colors.primary}}
                thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
                value={props.state} 
                onValueChange={props.onChange} />
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian,
            vegan: isVegan
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);
    
    useEffect(() =>{
        navigation.setParams({save: saveFilters})
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters/Restrictions</Text>
            <FilterSwitch 
                label='Gluten-Free' 
                state={isGlutenFree} 
                onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch 
                label='Lactose-Free' 
                state={isLactoseFree} 
                onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch 
                label='Vegetarian' 
                state={isVegetarian} 
                onChange={newValue => setIsVegetarian(newValue)} />
            <FilterSwitch 
                label='Vegan' 
                state={isVegan} 
                onChange={newValue => setIsVegan(newValue)} />
        </View>
    )
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerLeft: (() => <DrawerButton navigation={navData.navigation} />),
        headerRight: (() => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Save' 
                iconName='ios-save' 
                onPress={navData.navigation.getParam('save')} />
        </HeaderButtons>))
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
})

export default FiltersScreen