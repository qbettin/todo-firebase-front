import { createStore } from 'vuex';
import * as serviceUtil from '@/util/serviceUtil';
import { Todo } from '@/entity/todo';
import { User } from '@/entity/user';

export default createStore({
  state: {
    currentUser: localStorage.getItem('currentUser') || null as string | null,
    currentUserID: localStorage.getItem('currentUserID') || null as string | null,
    todos: [] as Todo[],
  },
  mutations: {
    setUser(state, user: User) {
      state.currentUser = user.username;
      state.currentUserID = user._id;
      localStorage.setItem('currentUserID', user._id);
      localStorage.setItem('currentUser', user.username);
    },
    clearUser(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUserID');
      localStorage.removeItem('currentUser');
    },
    setTodos(state, todos: Todo[]) {
      state.todos = todos;
    },
    addTodo(state, todo: Todo) {
      state.todos.push(todo);
    },
    updateTodo(state, updatedTodo: Todo) {
      const index = state.todos.findIndex((todo) => todo._id === updatedTodo._id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    },
    removeTodo(state, id: string) {
      state.todos = state.todos.filter((todo) => todo._id !== id);
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      const user = await serviceUtil.loginUser(username, password);
      commit('setUser', user);
    },
    async register({ commit }, { username, password }) {
      const user = await serviceUtil.registerUser(username, password);
      commit('setUser', user);
    },
    async logout({ commit }) {
      await serviceUtil.logoutUser();
      commit('clearUser');
    },
    async loadTodos({ commit }) {
      const todos = await serviceUtil.loadTodos();
      commit('setTodos', todos);
    },
    async createTodo({ commit }, { task }) {
      const todo = await serviceUtil.createTodo(task);
      commit('addTodo', todo);
    },
    async editTodo({ commit }, { id, task, completed }: { id: string; task: string; completed: boolean }) {
      const updatedTodo = await serviceUtil.editTodo(id, task, completed);
      commit('updateTodo', updatedTodo);
    },
    async deleteTodo({ commit }, id: string) {
      await serviceUtil.deleteTodo(id);
      commit('removeTodo', id);
    },
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    getCurrentUser(state) {
      return state.currentUser || localStorage.getItem('currentUser');
    },
    getCurrentUserID(state) {
        return state.currentUserID || localStorage.getItem('currentUserID');
      },
  },
});
