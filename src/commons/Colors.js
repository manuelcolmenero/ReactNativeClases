export const white = '#F7F7F7'

export const style = StyleSheet.create({
    cell: {
        // height: 100, 
        // marginVertical: 10
        height: 150,
        backgroundColor: Colors.white,
        margin: 5,
        padding: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        marginVertical: 20,
    },
    textCell: {
        fontSize: 14, 
        textAlign: 'center', 
    }
})