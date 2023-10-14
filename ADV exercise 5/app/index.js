import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useForm, Controller } from "react-hook-form";

const myStyle = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 padding: 20,
 },
 headerText: {
 fontSize: 24,
 fontWeight: "bold",
 marginBottom: 20,
 color: "white",
 fontFamily: "Arial San-serif",
 },
 inputContainer: {
 marginBottom: 10,
 width: "100%",
 },
 labelText: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 5,
 color: "white",
 },
 input: {
 backgroundColor: "transparent",
 padding: 10,
 borderRadius: 20, // Make the input boxes rounded
 width: "100%",
 borderWidth: 1,
 borderColor: "#FFFFFF",
 color: "#FFFFFF",
 fontFamily: "Arial San-serif",
 },
 button: {
 backgroundColor: "#FFFFFF",
 padding: 15,
 borderRadius: 30, // Make the button rounder
 width: "100%",
 alignItems: "center",
 },
 buttonText: {
 color: "gray",
 fontSize: 18,
 },
 errorText: {
 color: "blue",
 fontFamily: "Arial San-serif",
 fontSize: 14,
 },
});

export default function Home() {
 const { control, handleSubmit, formState: { errors } } = useForm({
 defaultValues: {
 email: '',
 password: '',
 }
 });

 const onSubmit = data => {
 console.log(data);
 };

 return (
 <ImageBackground
 source={{ uri: 'https://i.pinimg.com/originals/ca/07/2d/ca072d207e513f31f98ef69efe0de1b2.jpg' }}
 style={myStyle.container}
 >
 <View style={myStyle.container}>
 <Text style={myStyle.headerText}>Login your account</Text>

 <View style={myStyle.inputContainer}>
 <Text style={myStyle.labelText}>Email:</Text>
 <Controller
 control={control}
 rules={{
 required: true,
 }}
 render={({ field: { onChange, onBlur, value } }) => (
 <TextInput
 placeholder="Enter your Email"
 onBlur={onBlur}
 onChangeText={onChange}
 value={value}
 style={myStyle.input}
 keyboardType="email-address"
 />
 )}
 name="email"
 />
 {errors.email && <Text style={myStyle.errorText}>This is required.</Text>}
 </View>

 <View style={myStyle.inputContainer}>
 <Text style={myStyle.labelText}>Password:</Text>
 <Controller
 control={control}
 rules={{
 required: true,
 }}
 render={({ field: { onChange, onBlur, value } }) => (
 <TextInput
 placeholder="Enter password"
 onBlur={onBlur}
 onChangeText={onChange}
 value={value}
 style={myStyle.input}
 secureTextEntry={true}
 />
 )}
 name="password"
 />
 {errors.password && <Text style={myStyle.errorText}>This is required.</Text>}
 </View>

 <TouchableOpacity style={myStyle.button} onPress={handleSubmit(onSubmit)}>
 <Text style={myStyle.buttonText}>Sign In</Text>
 </TouchableOpacity>
 </View>
 </ImageBackground>
 );
}