// Task.js representa uma única tarefa.

// Importa o React e a função useState do pacote 'react'
import React, { useState } from "react";
// Importa os componentes View, Text, StyleSheet e TouchableOpacity do pacote 'react-native'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Importa o componente Icon do pacote 'react-native-vector-icons/FontAwesome'
import Icon from "react-native-vector-icons/FontAwesome";

// Componente funcional Task que recebe as propriedades task, onDelete e onEdit
const Task = ({ task, onDelete, onEdit }) => {
  // Estado para controlar o estado de marcação da tarefa
  const [isChecked, setIsChecked] = useState(false);

  // Função para alternar o estado de marcação da tarefa
  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  // Retorna a estrutura da tarefa (um item na lista)
  return (
    <View style={styles.task}>
      {/* Checkbox */}
      <TouchableOpacity onPress={toggleCheck}>
        <Icon
          name={isChecked ? "check-square-o" : "square-o"}
          size={20}
          color={isChecked ? "#2ecc71" : "#b5e8c0"}
          style={styles.checkbox}
        />
      </TouchableOpacity>
      {/* Texto da tarefa */}
      <Text style={styles.taskText}>{task.text}</Text>
      {/* Ícones para deletar e editar */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Icon
            name="trash-o"
            size={20}
            color="#ff6961"
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Icon
            name="edit"
            size={20}
            color="#c563ce"
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles para Task
const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribui o espaço entre os elementos
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1, // Ocupa o espaço restante disponível
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginLeft: 10,
  },
});

// Exporta o componente Task para ser utilizado em outros arquivos
export default Task;
