import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TabView, SceneMap } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#a9c1e8', 
  },
  listItem: {
    padding: 10,
    backgroundColor: '#e1e2e6',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d4d4d4',
    marginBottom: 10,
    color: 'white', 
  },
  button: {
    padding: 15, 
    backgroundColor: '#4b69de',
    borderRadius: 1, 
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  scene: {
    flex: 1,
  },
  deleteText: {
    paddingTop: 25,
    paddingLeft: 180,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', 
  },
});


const ListItem = ({ todo, onDeleteItem }) => {
  return (
    <View style={styles.listItem}>
      {todo.image && <Image source={{ uri: todo.image }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{todo.title}</Text> 
        <Text numberOfLines={2}>{todo.description}</Text>
        <TouchableOpacity onPress={onDeleteItem}>
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListComponent = ({ todos, onDeleteItem }) => {
  return (
    <ScrollView style={styles.scene}>
      {todos.map((todo, index) => (
        <ListItem key={index} todo={todo} onDeleteItem={() => onDeleteItem(index)} />
      ))}
    </ScrollView>
  );
};

const CreateOrUpdateComponent = ({ onTodoCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleCreate = () => {
    if (title && description) {
      const newTodo = {
        title,
        description,
        image: selectedImage,
      };
      onTodoCreate(newTodo);
      setTitle('');
      setDescription('');
      setSelectedImage(null);
    }
  };

  return (
    <View style={styles.scene}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4} // Adjust the number of lines as needed
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text>Import Image</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const initialLayout = { width: 360 };

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'list', title: 'List' },
    { key: 'createOrUpdate', title: 'Create/Update' },
  ]);

  const [todos, setTodos] = useState([]);

  const onDeleteItem = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const renderScene = SceneMap({
    list: () => <ListComponent todos={todos} onDeleteItem={onDeleteItem} />,
    createOrUpdate: () => <CreateOrUpdateComponent onTodoCreate={(todo) => setTodos([...todos, todo])} />,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

export default App;