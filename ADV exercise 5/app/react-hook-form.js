// import { Text, View, TextInput, Button, Alert } from "react-native";
// import { useForm, Controller } from "react-hook-form";

// export default function App() {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: ''
//     }
//   });

//   const onSubmit = (data) => {
//     router.push('/home')
//   };

//   return (
//     <View>
//       <Controller
//         control={control}
//         rules={{
//          required: {
//             value: true,
//             message: 'Firstname is required.'
//          },
//          minLength: {
//             value: 8,
//             message: 'min length is 8'
//          }
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             placeholder="First name"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )} name="firstName"
//       />
//       {errors.firstName && <Text>{errors.firstName.message}</Text>}

//       <Controller
//         control={control}
//         rules={{
//             required: true,
//             maxLength: 100,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             placeholder="Last name"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//         name="lastName"
//       />
//       {errors.lastName && <Text>This is required.</Text>}

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }