/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { useCallback, useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, FlatList, TextInput, TouchableOpacity, Pressable } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalenderComponent from '../components/cusom-calender-component';

const Messages = () => {
    const [sms, setSms] = useState<any>([]);
    const [query, setQuery] = useState('');
    const [seletectedStartDate, setSelectedStartDate] = useState('');
    const [seletectedEndDate, setSelectedEndDate] = useState('');
    const [startCalendarVisible, setStartCalendarVisible] = useState(false);
    const [endCalendarVisible, setEndCalendarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filteredSms, setFilteredSms] = useState([]);

    async function requestPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS, {
                title: 'SMS permission',
                message: 'This app requires SMS permission',
                buttonNeutral: 'Ask me later',
                buttonNegative: 'Cancel',
                buttonPositive: 'Ok',
            }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    const fetchSms = async () => {
        const hasPermission = await requestPermission();
        if (hasPermission) {
            setLoading(true);
            SmsAndroid.list(
                JSON.stringify({box: 'inbox'}),
                (fail: any) => {
                    console.log('Failed with error', fail);
                    setLoading(false);
                },
                (count: any, smsList: any) => {
                    var messages = JSON.parse(smsList);
                    if (query !== '') {
                        messages = messages.filter((message: any) => message.body.toLowerCase().includes(query.toLowerCase()) || message.address.toLowerCase().includes(query.toLowerCase()));
                    }
                    if (seletectedStartDate && seletectedEndDate) {
                        messages = messages.filter((message: any) => {
                            const messageDate = new Date(message.date).toISOString().split('T')[0]; // Ensure message date is in YYYY-MM-DD format
                            const normalizedMessageDate = new Date(messageDate); // Convert message date to Date object
                            const normalizedStartDate = new Date(seletectedStartDate); // Convert selected start date to Date object
                            const normalizedEndDate = new Date(seletectedEndDate); // Convert selected end date to Date object
                            return normalizedMessageDate >= normalizedStartDate && normalizedMessageDate <= normalizedEndDate;
                        });
                    }
                    setSms(messages);
                    setFilteredSms( messages);
                    setLoading(false);
                }
            );
        }
    };


    const filterMessages = useCallback(() => {
        let filtered = sms;
        if (query) {
            filtered = filtered.filter((message:any) =>
                message.body.toLowerCase().includes(query.toLowerCase()) ||
                message.address.toLowerCase().includes(query.toLowerCase())
            );
        }
        if (seletectedStartDate && seletectedEndDate) {
            filtered = filtered.filter((message:any) => {
                const messageDate = new Date(message.date);
                const normalizedStartDate = new Date(seletectedStartDate);
                const normalizedEndDate = new Date(seletectedEndDate);
                return messageDate >= normalizedStartDate && messageDate <= normalizedEndDate;
            });
        }
        setFilteredSms(filtered); // Update filtered messages
    }, [query, seletectedStartDate, seletectedEndDate, sms]);

    useEffect(() => {
        fetchSms();
    }, []);

    useEffect(() => {
        filterMessages(); // Reapply filters whenever dependencies change
    }, [query, seletectedStartDate, seletectedEndDate]);


    const handlePrint = ()=>{
        for(var i = 0; i < 10; i++){
            console.log(sms[i].body);
        }
    };

    const renderSms = ({ item }: any) => {
        return (
            <TouchableOpacity
                style={{ backgroundColor: '#f7f5fb', borderColor: '#bababa', borderWidth: 1, borderRadius: 5, marginVertical: 10, marginHorizontal: 5, padding: 5 }}
                onPress={handlePrint}
            >
                <Text style={{ fontWeight: '900', color: 'black' }}>{item.address}</Text>
                <Text style={{ fontWeight: '500', color: '#300dff' }}>{item.body}</Text>
                <Text style={{ color: 'green', fontWeight: '500' }}>{new Date(item.date).toLocaleString()}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <View style={{ margin: 10 }}>
            <View style={{
                marginHorizontal: 10,
                height: 50,
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <TextInput
                    onChangeText={(text) => setQuery(text)} // Update query state on text change
                    value={query} // Bind value to query state
                    placeholder="Search..." // Placeholder text when TextInput is empty
                    style={{
                        borderColor: 'gray',
                        width: '70%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 5,
                        paddingHorizontal: 10, // Added padding for better appearance
                    }}
                />
                {/* Start date */}
                <TouchableOpacity style={{
                    backgroundColor: 'black', borderRadius: 10, padding: 12,
                }}
                    onPress={() => !endCalendarVisible && setStartCalendarVisible(true)}
                >
                    <Icon name="calendar" size={20} color="white" />
                </TouchableOpacity>
                {/* Start date */}
                {/* End date */}
                <TouchableOpacity style={{
                    backgroundColor: 'black', borderRadius: 10, padding: 12,
                }}
                    onPress={() => !startCalendarVisible && setEndCalendarVisible(true)}
                >
                    <Icon name="calendar" size={20} color="white" />
                </TouchableOpacity>
                {/* End date */}
            </View>
            <CustomCalenderComponent
                calendarVisibleType={startCalendarVisible}
                seletectedDateType={seletectedStartDate}
                setSelectedDateType={setSelectedStartDate}
                setCalendarVisibleType={setStartCalendarVisible}
            />
            <CustomCalenderComponent
                calendarVisibleType={endCalendarVisible}
                seletectedDateType={seletectedEndDate}
                setSelectedDateType={setSelectedEndDate}
                setCalendarVisibleType={setEndCalendarVisible}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
            }}>
                {seletectedStartDate && <View style={{
                    backgroundColor: 'black',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <Text style={{
                        color: 'white',
                    }}>{seletectedStartDate}</Text>
                    <Pressable onPress={() => {
                        setSelectedStartDate('');
                        fetchSms();
                    }}>
                        <Icon name="close-circle-outline" color="white" size={20} />
                    </Pressable>
                </View>}
                {seletectedEndDate && <View style={{
                    backgroundColor: 'black',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <Text style={{
                        color: 'white',
                    }}>{seletectedEndDate}</Text>
                    <Pressable onPress={() => {
                        setSelectedEndDate('');
                        fetchSms();
                    }}>
                        <Icon name="close-circle-outline" color="white" size={20} />
                    </Pressable>
                </View>}
                <View style={{
                    paddingHorizontal:10,
                    backgroundColor: '#dbdbdb',
                    marginHorizontal: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: 5,
                    justifyContent: 'center',
                    borderColor: 'gray',
                    borderWidth: 1,
                }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: '500',
                    }}>{filteredSms.length} Items</Text>
                </View>
            </View>
            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 20, fontWeight: '500',
                    }}>
                        Loading...
                    </Text>
                </View>
            ) : sms.length > 0 ? (
                <FlatList
                    data={filteredSms}
                    renderItem={renderSms}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={21}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>No message found!</Text>
                </View>
            )}

        </View>
    );
};

export default Messages;



