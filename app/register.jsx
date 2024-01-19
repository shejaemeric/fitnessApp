import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Register() {
    const router = useRouter();

    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />

            {/* Background Image */}
            <Image className="h-full w-full" source={require('../assets/images/welcome.png')} />

            {/* Black Gradient Cover */}
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                style={{ width: wp(100), height: hp(70), position: 'absolute', top: 0, left: 0 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.8 }}
                className="flex justify-end pb-12 space-y-8"
            >
                {/* Title */}
                <Animated.View entering={FadeInDown.delay(100).springify()} className="flex items-center">
                    <Text style={{ fontSize: hp(5) }} className="text-white font-bold tracking-wide">
                        Best <Text className="text-rose-500">Workouts</Text>
                    </Text>
                    <Text style={{ fontSize: hp(5) }} className="text-white font-bold tracking-wide">
                        For You
                    </Text>
                </Animated.View>

                {/* Registration Form */}
                <View className="px-6">
                    <TextInput
                        placeholder="Name"
                        style={{ height: hp(7), borderWidth: 1, borderColor: '#ccc', backgroundColor: "white", borderRadius: 8, marginBottom: 10, paddingLeft: 10 }}
                    />
                    <TextInput
                        placeholder="Email"
                        style={{ height: hp(7), borderWidth: 1, backgroundColor: "white", borderColor: '#ccc', borderRadius: 8, marginBottom: 10, paddingLeft: 10 }}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        style={{ height: hp(7), backgroundColor: "white", borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 20, paddingLeft: 10 }}
                    />

                    {/* Register Button */}
                    <TouchableOpacity
                        onPress={() => router.push('home')}
                        style={{ height: hp(7), width: wp(80), backgroundColor: '#E83D66', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                        className="mx-auto"
                    >
                        <Text style={{ fontSize: hp(3), color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mx-auto"
                        onPress={() => router.push('login')}
                        style={{ backgroundColor: 'rgba(16, 16, 16, 0.83))', p: 2, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', letterSpacing: 1, paddingTop: 40 }}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}
