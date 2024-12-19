import axios from 'axios';


export const getAllTasks = async () => {
	return axios.get('http://localhost:3000/tasks', {
		responseType: 'json',
	}).then((res) => {
		if (res.status == 200) {
			return res.data;
		}
	})
}