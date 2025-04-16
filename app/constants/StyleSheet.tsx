import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from './theme';

export const GlobalStyleSheet = StyleSheet.create({
    container: {
        padding: 15,
        maxWidth: SIZES.container,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    formControl: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        paddingHorizontal: 15,
    },
    activeInput: {
        borderColor: COLORS.primary,
    },
    label: {
        ...FONTS.font,
        color: COLORS.label,
        marginBottom: 8,
    },
    inputGroup: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -5,
    },
    col50: {
        width: '50%',
        paddingHorizontal: 5,
    },
    col60: {
        width: '60%',
        paddingHorizontal: 5,
    },
    col40: {
        width: '40%',
        paddingHorizontal: 5,
    },
    col33: {
        width: '33.33%',
        paddingHorizontal: 5,
    },
    card: {
        marginBottom: 15,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
    },
    cardHeader: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    cardBody: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    shadow: {
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    shadow2: {
        borderWidth: 1,
        borderRadius: SIZES.radius,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    image: {
        width: 20,
        height: 20,
        tintColor: 'red',
        resizeMode: 'contain',
    },
    inputBox: {
        height: 48,
        paddingLeft: 50,
        justifyContent: 'center',
        marginBottom: 15,
    },
    background: {
        backgroundColor: 'rgba(0,0, 0, 0.20)',
        height: 35,
        width: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...FONTS.font,
        color: 'red',
        marginLeft: 10,
    },
    TouchableOpacity2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 55,
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1
    },
    shadowPrimary: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
    },
    notification: {
        height: 16,
        width: 16,
        backgroundColor: '#FF3131',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputimage: {
        position: 'absolute',
        left: 15,
        height: 16,
        width: 16,
        resizeMode: 'contain',
        opacity: .8,
    },
    backbtn:{
        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
    }
});