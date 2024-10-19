/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Modal, Alert, View, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomCalenderComponentProps{
    calendarVisibleType:boolean;
    seletectedDateType:any,
    setSelectedDateType: Function,
    setCalendarVisibleType:Function
}

const CustomCalenderComponent = ({
    calendarVisibleType,
    seletectedDateType,
    setSelectedDateType,
    setCalendarVisibleType,
}:CustomCalenderComponentProps)=>{
    return(
    <Modal
        transparent={true}
        animationType="slide"
        visible={calendarVisibleType}
        onRequestClose={() => {
            Alert.alert('modal has closed');
        }}
    >
        <View style={{
            backgroundColor: '#85A1F2',
            alignItems: 'center',
            height: 360,
            width: 250,
            marginVertical: 100,
            marginHorizontal: 20,
            borderRadius: 20,
        }}>
            <Pressable onPress={() => { setCalendarVisibleType(!calendarVisibleType); }}>
                <Icon name="close-circle-outline" color="white" size={30} />
            </Pressable>
            <Calendar
                onDayPress={(day: any) => setSelectedDateType(day.dateString)}
                markedDates={{
                    [seletectedDateType]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                }}
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                }}
            />
        </View>
    </Modal>
    );
};

export default CustomCalenderComponent;
