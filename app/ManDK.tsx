import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function ManDN() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();
    const handleNavigate = () => {
        // Điều hướng đến màn hình "ManDK" khi bấm
        router.push('/ManDN'); // Đảm bảo ManDK là một route hợp lệ trong dự án của bạn
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const handleNameChange = (text: string) => {
        setName(text);
        if (text === '') {
            setNameError('Tên không được để trống');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text && !emailRegex.test(text)) {
            setIsEmailValid(false);
            setEmailError('Email không hợp lệ. Vui lòng nhập email hợp lệ.');
        } else {
            setIsEmailValid(true);
            setEmailError('');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text !== '123456') {
            setPasswordError('');
        } else {
            setPasswordError('');
        }
    };
    const handleRePasswordChange = (text: string) => {
        setRePassword(text);
        if (text !== password) {
            setRePasswordError('Mật khẩu nhập lại không khớp');
        } else {
            setRePasswordError('');
        }
    };

    const handleSubmit = () => {
        // Đánh dấu đã nhấn submit
        setIsSubmitted(true);

        // Xóa lỗi cũ
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setRePasswordError('');

        if (!name) {
            setNameError('Nhập Tên');
        }
        // Kiểm tra nếu email trống
        if (!email) {
            setEmailError('Nhập Tài Khoản');
        }

        // Kiểm tra nếu password trống
        if (!password) {
            setPasswordError('Nhập Mật Khẩu');
        }
        if (!rePassword) {
            setRePasswordError('Nhập lại Mật Khẩu');
        } else if (rePassword !== password) {
            setRePasswordError('Mật khẩu nhập lại không khớp');
        }

        // Nếu tất cả trường hợp hợp lệ
        if (email && password && name && rePassword && rePassword === password) {
            // Kiểm tra điều kiện đăng nhập
            if (!isEmailValid) {
                setEmailError('Email không hợp lệ');
            } else if (password !== '123456') {
                setPasswordError('Mật khẩu không hợp lệ');
            } else {
                Alert.alert('Thành công', 'Bạn đã đăng nhập thành công!')
                // Chuyển đến màn hình khác
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome to Lungo !!</Text>
            <Text style={styles.subText}>Register to Continue</Text>

            {/* Email Input */}
            <TextInput
                placeholder="Name"
                placeholderTextColor="#8e8e8e"
                style={[
                    styles.input,
                    styles.transparentInput,
                    isSubmitted && name === '' && { borderColor: 'red' }, // Đổi viền đỏ nếu lỗi
                ]}

                value={name}
                onChangeText={handleNameChange}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <TextInput
                placeholder="Email Address"
                placeholderTextColor="#8e8e8e"
                style={[
                    styles.input,
                    styles.transparentInput,
                    isSubmitted && email === '' && { borderColor: 'red' }, // Đổi viền đỏ nếu lỗi
                ]}
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#8e8e8e"
                    style={[
                        styles.input,
                        styles.transparentInput,
                        isSubmitted && password === '' && { borderColor: 'red' },
                        passwordError && { borderColor: 'red' },
                    ]}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                {/* Eye Icon */}
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Image
                        source={showPassword ? require('../assets/images/eye-closed.png') : require('../assets/images/eye-open.png')}
                        style={styles.eyeImage}
                    />
                </TouchableOpacity>
            </View>

            {/*Re_type Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Re_type Password"
                    placeholderTextColor="#8e8e8e"
                    style={[
                        styles.input,
                        styles.transparentInput,
                        isSubmitted && password === '' && { borderColor: 'red' },
                        passwordError && { borderColor: 'red' },
                    ]}
                    secureTextEntry={!showPassword}
                    value={rePassword}
                    onChangeText={handleRePasswordChange}
                />
                {/* Eye Icon */}
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Image
                        source={showPassword ? require('../assets/images/eye-closed.png') : require('../assets/images/eye-open.png')}
                        style={styles.eyeImage}
                    />
                </TouchableOpacity>
            </View>
            {rePasswordError ? <Text style={styles.errorText}>{rePasswordError}</Text> : null}

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                <Text style={styles.signInButtonText}>Register</Text>
            </TouchableOpacity>



            {/* Footer */}
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                    You have an account? Click{' '}
                    <TouchableOpacity onPress={handleNavigate}>
                        <Text style={styles.linkText}>Login</Text>
                    </TouchableOpacity>
                </Text>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000014',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    welcomeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        color: '#8e8e8e',
        fontSize: 16,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#8e8e8e',
    },
    transparentInput: {
        backgroundColor: 'transparent',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    eyeImage: {
        width: 35,
        height: 30,
        tintColor: '#8e8e8e',
    },
    signInButton: {
        width: '100%',
        backgroundColor: '#d17842',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 5,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#8e8e8e',
        fontSize: 14,
        marginBottom: 5,
    },
    linkText: {
        color: '#d87d56',
        fontWeight: 'bold',

    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
});
