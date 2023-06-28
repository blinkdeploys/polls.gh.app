import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerMedium: {
    fontSize: SIZES.medium,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },

  /*container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },*/
  overlay: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .3)', // Semi-transparent background color
  },
  overlayContent: {
    backgroundColor: 'white', // Content background color
    padding: 20,
    borderRadius: 10,
    opacity: 1, // Set content opacity to 100%
    width: "90%",
  },
  overlayText: {
    fontSize: 16,
    // marginBottom: 10,
  },
  overlayButton: {
    width: "auto",
    height: "auto",
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  voteInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  voteInputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  voteInput: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.xSmall,
  },
  voteBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default styles;
