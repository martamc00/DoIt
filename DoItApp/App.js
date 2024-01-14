import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import TaskList from "./components/TaskList";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import "react-native-gesture-handler";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  /* Async Storage */

 
  useEffect(() => {
    // Função para guardar os dados no armazenamento quando a lista de tarefas é alterada
    async function saveData() {
      if (tasks != null && tasks.length > 0) {
        await AsyncStorage.setItem("userdata", JSON.stringify(tasks));
      }
    }
    // Chama a função para salvar os dados
    saveData();
  }, [tasks]);

  
  useEffect(() => {
    // Função para carregar os dados do armazenamento quando a aplicação inicia
    async function getData() {
      // Lê a lista de tarefas do armazenamento (formato JSON)
      var jsonValue = await AsyncStorage.getItem("userdata");
      // Se existirem dados, atualiza a lista de tarefas
      if (jsonValue != null) {
        setTasks(JSON.parse(jsonValue));
      }
    }
    // Chama a função para carregar os dados
    getData();
  }, []); // 

  // Carregar a fonte personalizada
  useEffect(() => {
    const loadFont = async () => {

      await Font.loadAsync({
        CuteFont: require("./assets/Fonts/CuteFont-Regular.ttf"),
      });
      setFontLoaded(true);
    };


    loadFont();
  }, []);

  // Função para adicionar uma tarefa à lista
  const addTask = () => {
    if (task.trim() !== "") {
      if (editedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === editedTask.id ? { ...t, text: task } : t
          )
        );
        setEditedTask(null);
      } else {
        setTasks([...tasks, { id: Date.now(), text: task }]);
      }
      setTask(""); 
    }
  };

  // Função para eliminar uma tarefa da lista
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  // Função para editar uma tarefa
  const editTask = (task) => {
    setTask(task.text); // Preenche o campo de entrada com o texto da tarefa a ser editada
    setEditedTask(task);
  };

  // Função para confirmar se quer eliminar uma tarefa
  const handleDelete = (taskId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteTask(taskId),
        style: "destructive",
      },
    ]);
  };

 
  if (!fontLoaded) {
    return null;
  }

  // Estrutura da interface do aplicativo
  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo do aplicativo */}
      <View style={styles.header}>
        <Image style={styles.logo} source={require("./assets/cutecheck.png")} />
        <Text style={styles.logoText}>DoIt</Text>
      </View>
      {/* Campo de entrada para tarefa e botão de adicionar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Componente de lista de tarefas */}
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={editTask} />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4e5cd", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: 40,
  },
  logoText: {
    fontFamily: "CuteFont",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B2D42",
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#8D99AE",
    borderRadius: 5,
    color: "#2B2D42",
    backgroundColor: "#FFF",
  },
  addButton: {
    backgroundColor: "#fa96a2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
