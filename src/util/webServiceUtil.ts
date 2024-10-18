import { auth, firestore } from '../../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDoc,
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { Todo } from '@/entity/todo';
import { User } from '@/entity/user';

// Firebase collections
const todosCollection = collection(firestore, 'todos');

// User Authentication
export const registerUser = async (username: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, username, password);
  const user = userCredential.user;
  return {
    _id: user.uid,
    username: user.email || '',
    password: '',  // Do not store passwords in the frontend
  };
};

export const loginUser = async (username: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      return {
        _id: user.uid,
        username: user.email || '',
        password: '',  // Do not store passwords in the frontend
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// To-Do Operations
export const loadTodos = async (): Promise<Todo[]> => {
  const querySnapshot = await getDocs(todosCollection);
  const todos: Todo[] = [];
  querySnapshot.forEach((doc) => {
    const todoData = doc.data();
    todos.push({
      _id: doc.id,
      task: todoData.task,
      completed: todoData.completed,
      created_at: todoData.created_at.toDate(),
      completed_at: todoData.completed_at?.toDate() || null,
    });
  });
  return todos;
};

export const createTodo = async (task: string): Promise<Todo> => {
    const created_at = new Date();
    const newTodo: Omit<Todo, '_id'> = {
      task,
      completed: false,
      created_at: created_at,
      completed_at: null,
    };
    // Use Firestore to add the new Todo
    const docRef = await addDoc(todosCollection, newTodo);
    
    // Optionally, fetch the user_id from the authenticated user here
    // but since it's set on the backend, you don't need to do this
    return { ...newTodo, _id: docRef.id };
  };
  

export const editTodo = async (id: string, task: string, completed: boolean): Promise<Todo> => {
    const todoDoc = doc(firestore, 'todos', id);
    const todoSnapshot = await getDoc(todoDoc);
  
    if (!todoSnapshot.exists()) {
      throw new Error(`Todo with id ${id} does not exist.`);
    }
  
    const existingTodo = todoSnapshot.data();
    console.log(existingTodo);
    const updatedAt = new Date();
  
    // Update only the necessary fields in Firestore
    await updateDoc(todoDoc, {
      task,
      completed,
      completed_at: completed ? updatedAt : null,  // Set `completedAt` only if completed
    });
  
    // Return the updated todo, preserving `user` and `createdAt`
    const updatedTodo: Todo = {
      _id: id,
      task,
      completed,
      completed_at: completed ? updatedAt : null,
      created_at: existingTodo.created_at.toDate(),  // Keep the original `createdAt` value
    };
    console.log(updatedTodo);
  
    return updatedTodo;
  };

export const deleteTodo = async (id: string): Promise<void> => {
  const todoDoc = doc(firestore, 'todos', id);
  await deleteDoc(todoDoc);
};
