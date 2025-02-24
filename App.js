import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useReducer, useState } from 'react';
import uuid from 'react-native-uuid'
import Row from '../TodoReducer/components/Row';

const initialState = {
  tasks: [{ id: uuid.v4(), name: 'Test Task'}]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [...state.tasks, {id: uuid.v4(), name: action.newTask }] }
      case 'delete':
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.id)}
    default:
      throw new Error()
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [newTask, setNewTask] = useState('')
  const [name, setName] = useState('')

  const addTask = (name) => {
    dispatch({ type: 'add', newTask: name })
    setNewTask('');
    setName('');
  }

  const deleteTask = (id) => {
    dispatch({ type: 'delete', id })
  }

  return (

    <SafeAreaView style={styles.container}>
         <Text style={styles.header}>Todo list (But with Reducer!)</Text>
         <View style={styles.inputContainer}>
      <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder="Type your task here..."
      />
      <TouchableOpacity onPress={() => addTask(name)}>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={state.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Row
            item={item}
            deleteTask={deleteTask}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'left',
    justifyContent: 'center',
    marginVertical: 30,
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#f0f0f0', // Very light gray background color
},
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  save: {
    marginVertical: 5,
    padding: 5,
    color: '#87CEFA',
  }

});
