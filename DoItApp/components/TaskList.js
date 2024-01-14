// TaskList.js será uma lista de tarefas.

// Importa o React do pacote 'react'
import React from "react";
// Importa o componente FlatList do pacote 'react-native'
import { FlatList } from "react-native";
// Importa o componente Task do arquivo Task.js
import Task from "./Task";

// Componente funcional TaskList que recebe as propriedades tasks, onDelete e onEdit
const TaskList = ({ tasks, onDelete, onEdit }) => {
  // Retorna um componente FlatList que renderiza a lista de tarefas
  return (
    <FlatList
      // Propriedade 'data' recebe a lista de tarefas
      data={tasks}
      // Propriedade 'keyExtractor' extrai o identificador único de cada item
      keyExtractor={(item) => item.id.toString()}
      // Propriedade 'renderItem' renderiza cada item da lista usando o componente Task
      renderItem={({ item }) => (
        <Task task={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

// Exporta o componente TaskList para ser utilizado em outros arquivos
export default TaskList;
