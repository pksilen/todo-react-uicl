/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AddTodo } from './AddTodo';

const mockAddTodo = jest.fn();

jest.mock('../../stores/todos/todosStore', () => () => ({
  addTodo: mockAddTodo
}));

describe('AddTodo', () => {
  it('renders input for todo title and button for adding todo', () => {
    // WHEN
    render(<AddTodo />);

    // THEN
    const todoTitleInput = screen.getByLabelText(/Add new todo/i);
    const addTodoButton = screen.getByRole('button', {
      name: /Add todo/i
    });

    expect(todoTitleInput).toBeInTheDocument();
    expect(addTodoButton).toBeInTheDocument();
  });

  it('adds todo', () => {
    // GIVEN
    render(<AddTodo />);
    const todoTitleInput = screen.getByLabelText(/Add new todo/i);
    const addTodoButton = screen.getByRole('button', {
      name: /Add todo/i
    });

    act(() => user.type(todoTitleInput, 'Test todo'));
    act(() => user.click(addTodoButton));

    // THEN
    expect(mockAddTodo).toHaveBeenCalledWith('Test todo');
  });

  it('does not add todo when todo title is empty', () => {
    // GIVEN
    render(<AddTodo />);

    const addTodoButton = screen.getByRole('button', {
      name: /Add todo/i
    });

    // WHEN
    act(() => user.click(addTodoButton));

    // THEN
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
