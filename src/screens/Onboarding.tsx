/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { FlatList, StyleSheet, View, Animated, useWindowDimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import onboardingScreens from '../constants/onboarding-screens';
import OnboardingItem from '../components/onboarding/onboarding-item';

const OnBoardingScreen = ({navigation}:any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width } = useWindowDimensions();

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );
    const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        console.log(currentIndex);
    }, [currentIndex]);

    const renderDots = () => {
        return (
            <View style={Styles.bottomContainer}>
                <View style={Styles.dotContainer}>
                    {
                        onboardingScreens.map((_, index) => {
                            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                            const dotWidth = scrollX.interpolate({
                                inputRange,
                                outputRange: [10, 50, 10],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    style={[Styles.activeDot, { width: dotWidth }]}
                                    key={index.toString()}
                                />
                            );
                        })
                    }
                </View>
            </View>
        );
    };

    return (
        <View style={Styles.container}>
            <FlatList
                horizontal={true}
                data={onboardingScreens}
                renderItem={({ item }) => <OnboardingItem item={item} navigation={navigation}/>}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item: any) => item.id}
                onScroll={handleScroll}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
            />
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderDots()}
            </View>
        </View>
    );
};


export default OnBoardingScreen;


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    activeDot: {
        backgroundColor: '#3498db',
        width: 30,
        height: 12,
        borderRadius: 50,
    },
    dotContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});
