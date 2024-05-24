import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../TodoServiceImpl';

export const testTodo = { id: '1', title: 'Test todo', isDone: true };
const handlers = [http.get(BASE_URL, () => HttpResponse.json(testTodo))];
export default handlers;
