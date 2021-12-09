import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import DrawerButton from '../components/DrawerButton';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    if (!favMeals || favMeals.length === 0) {
        return (
            <View style={styles.noFavsContainer}>
                <DefaultText>No favorite meals found. Start adding some!</DefaultText>
            </View>
        );
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerLeft: (() => <DrawerButton navigation={navData.navigation} />)
    };
}

const styles = StyleSheet.create({
    noFavsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;