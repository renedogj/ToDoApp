
// export const tasksStore = defineStore('tasksStore', () => {

	export const getAllTasks = async () => {
		// fetch(process.env.BACKEND_URL + '/tasks', {
		return fetch('http://localhost:3000/tasks', {
			method: 'GET',
		}).then((response) => { return response.json();})
			// .then((data) => {return data;})
			// .catch((error) => console.error('Error:', error));
	}

	// return {
	// 	getAllTasks: getAllTasks,
	// };
//createStore({
	// state: {
	// 	todos: []
	// },
	// mutations: {
	// 	setTodos(state, todos) {
	// 		state.todos = todos;
	// 	},
	// 	addTodo(state, todo) {
	// 		state.todos.push(todo);
	// 	},
	// 	deleteTodo(state, id) {
	// 		state.todos = state.todos.filter(todo => todo._id !== id);
	// 	}
	// },
	// actions: {
	// 	// Obtener todas las tareas
	// 	fetchTodos({ commit }) {
	// 		fetch(process.env.BACKEND_URL + '/tasks')  // URL del backend
	// 			.then(response => response.json())     // Convertir la respuesta a JSON
	// 			.then(data => commit('setTodos', data)) // Guardar las tareas en el store
	// 			.catch(error => console.error('Error fetching todos:', error)); // Manejo de errores
	// 	},

	// 	// Crear una nueva tarea
	// 	createTodo({ commit }, todo) {
	// 		fetch(process.env.BACKEND_URL + '/tasks', {
	// 			method: 'POST',  // Método POST para crear el nuevo todo
	// 			body: JSON.stringify(todo),  // Convertir el objeto `todo` a JSON
	// 			headers: {
	// 				'Content-Type': 'application/json'  // Indicar que el cuerpo es JSON
	// 			}
	// 		})
	// 			.then(response => response.json())  // Convertir la respuesta a JSON
	// 			.then(data => commit('addTodo', data))  // Añadir el nuevo todo al store
	// 			.catch(error => console.error('Error creating todo:', error));  // Manejo de errores
	// 	},

	// 	// Eliminar una tarea
	// 	removeTodo({ commit }, id) {
	// 		fetch(process.env.BACKEND_URL + '/tasks/' + id, {
	// 			method: 'DELETE'  // Método DELETE para eliminar el todo
	// 		})
	// 			.then(() => commit('deleteTodo', id))  // Eliminar el todo del estado en Vuex
	// 			.catch(error => console.error('Error deleting todo:', error));  // Manejo de errores
	// 	}
	// },
	// getters: {
	// 	allTodos: state => state.todos
	// }
// });