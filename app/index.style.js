import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    headerStyle: { backgroundColor: COLORS.lightWhite },
    logoText: {
        fontWeight: 'bold', fontSize: 18,
        paddingHorizontal: 10,
    },
    scrollViewContainer: {
        flex: 1,
        paddingHorizontal: SIZES.medium
    },
})

export default styles;