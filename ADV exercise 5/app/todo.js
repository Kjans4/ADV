import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const style = StyleSheet.create({
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "black",
    }
})

export default function Todo() {
    const [todos, setTodos] = useState([{
        title: 'Learn React Native',
        description: 'Learn React Native to build native apps',
    }]);

    const [todo, setTodo] = useState({ 
        title: "",
        description: "",
    });

    function clearTodo(){
        setTodo({ title: "", description: "" });
    }

    function titleOnChangeText(text){
        setTodo({ ...todo, title: text });
    }
    
    function descriptionOnChangeText(text){
        setTodo({ ...todo, description: text });
    }

    function addTodo(){
        setTodos([...todos, todo])
        clearTodo();
    }

    function deleteTodo(index){
        setTodos((prev) => {
            const todos = prev.filter((todo, i) => i !== index);
            return todos;
        });
    }

    return (
        <View>
            <Text>Title: {todo.title}</Text>
            <TextInput
                value={todo.title}
                onChangeText={titleOnChangeText}
                style={style.input}
            />

            <Text>Description: {todo.description}</Text>
            <TextInput
                value={todo.description}
                onChangeText={descriptionOnChangeText}
                style={style.input}
            />
            <Button 
                onPress={addTodo}
                title="Add Todo"></Button>

            {todos.map((todo, index) => {
                return (
                   <View key={index} 
                        style={{ marginTop: 10 }}>
                        <Text>Title: {todo.title}</Text>
                        <Text>Description: {todo.description}</Text>
                        <Button onPress={() => deleteTodo(index)}  title="Delete"></Button>
                   </View>
                )
            })}
        </View>
    )
}