import { setupServer } from 'msw/node';
import handlers, { testTodo } from './mocks/handlers';
import { todoService } from './TodoServiceImpl';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TodoServiceImpl', () => {
  describe('getTodos', () => {
    it('gets todos successfully', async () => {
      // WHEN
      const [todos, error] = await todoService.getTodos();

      // THEN
      expect(todos).toEqual(testTodo);
      expect(error).toBeNull();
    });

    it('returns an error when unable to connect the server', async () => {
      // GIVEN
      global.fetch = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      // WHEN
      const [todos, error] = await todoService.getTodos();

      // THEN
      expect(todos).toEqual([]);
      expect(error).toBeTruthy();
    });

    it('returns an error when response json parsing fails', async () => {
      // GIVEN
      global.fetch = jest.fn().mockImplementation(() => ({
        json: jest.fn().mockImplementation(() => {
          throw new Error('error');
        })
      }));

      // WHEN
      const [todos, error] = await todoService.getTodos();

      // THEN
      expect(todos).toEqual([]);
      expect(error).toBeTruthy();
    });

    it('returns an error when server response contains error', async () => {
      // GIVEN
      const errorResponseBody = { message: 'error' };

      global.fetch = jest.fn().mockImplementation(() => ({
        json: jest
          .fn()
          .mockImplementation(() => Promise.resolve(errorResponseBody)),
        ok: false
      }));

      // WHEN
      const [todos, error] = await todoService.getTodos();

      // THEN
      expect(todos).toEqual([]);
      expect(JSON.parse(error?.message ?? '')).toEqual(errorResponseBody);
    });
  });
});
