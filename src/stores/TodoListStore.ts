import { ToDo } from "@/interfaces/interfaces";
import { defineStore } from "pinia";

export const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todoList: [] as ToDo[],
    todoCompletedList: [] as ToDo[],
    idTodo: 0,
    idDone: 0,
  }),

  actions: {
    // not completed tasks
    addTodo(text: string) {
      this.todoList.push({
        text: text,
        id: (this.idTodo++).toString(),
        completed: false,
      });
    },

    deleteTodo(id: string) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== id;
      });
    },

    toggleTodo(id: string) {
      const current = this.todoList.find((obj) => obj.id === id) as ToDo;
      const todo: ToDo = {
        text: current.text,
        completed: !current.completed,
        id: current.id,
      };
      if (todo) {
        todo.completed = true;
        this.addCompletedTodo(todo.text);
        this.deleteTodo(todo.id);
      } else {
        console.log("Something went wrong while trying to complete Task.");
      }
    },

    // completed tasks
    addCompletedTodo(text: string) {
      this.todoCompletedList.push({
        text: text,
        id: (this.idDone++).toString(),
        completed: true,
      });
    },

    deleteCompletedTodo(id: string) {
      this.todoCompletedList = this.todoCompletedList.filter((object) => {
        return object.id !== id;
      });
    },

    redoCompletedTodo(id: string) {
      const current: ToDo = this.todoCompletedList.find(
        (obj) => obj.id === id,
      ) as ToDo;
      if (current !== undefined) {
        const todo: ToDo = {
          text: current.text,
          completed: !current.completed,
          id: current.id,
        };
        if (todo) {
          this.addTodo(todo.text);
          this.deleteCompletedTodo(todo.id);
        } else {
          console.log(
            "Something went wrong while trying to redo completed Task",
          );
        }
      }
    },
  },
});
