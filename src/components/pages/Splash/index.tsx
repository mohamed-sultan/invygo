import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "@interfaces/Navigation"
import { useEffect } from "react"
import { useTheme, wp, hp } from "@theme"

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>

const Splash = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>()
    const { isDarkMode } = useTheme()

    const handleAnimationFinish = () => {
       setTimeout(() => {
        navigation.replace('CarsListing')
       }, 3000)
    }
    useEffect(() => {
        handleAnimationFinish()
    }, [])

    return (
        <View style={styles.container}>
            <LottieView
                source={isDarkMode ? require('@assets/darkAnimation.json') : require('@assets/animation.json')}
                style={styles.animation}
                autoPlay
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: wp(40),
        height: hp(40),
        alignSelf: 'center',
    },
})

export default Splash