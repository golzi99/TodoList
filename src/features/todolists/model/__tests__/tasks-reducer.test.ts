import { v1 } from "uuid"
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"
import { Tasks } from "../../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "../../lib/enums"
import { Todolist } from "../../api/todolistsApi.types"

let startState: Tasks = {}
let todolistId1: string
let todolistId2: string

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    [todolistId1]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "4",
        title: "Redux",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "5",
        title: "Typescript",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "6",
        title: "RTK query",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "Book",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId2,
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId2,
      },
    ],
  }
})

test("correct task should be removed from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC({ taskId: "1", todolistId: todolistId1 }))

  expect(endState[todolistId1].length).toBe(5)
  expect(endState[todolistId1][0].id).toBe("2")
  expect(endState).toEqual({
    [todolistId1]: [
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "4",
        title: "Redux",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "5",
        title: "Typescript",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
      {
        id: "6",
        title: "RTK query",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "Book",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId2,
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId2,
      },
    ],
  })
})

test("correct todolist of tasks should be removed", () => {
  const endState = tasksReducer(startState, removeTodolistAC(todolistId1))

  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState[todolistId1]).not.toBeDefined()
  // expect(endState[todolistId1]).toBeUndefined()
})

test("correct task should be added to correct array", () => {
  const newTaskTitle = "New task"
  const endState = tasksReducer(
    startState,
    addTaskAC({
      task: {
        id: "7",
        title: newTaskTitle,
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        order: 1,
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
        todoListId: todolistId1,
      },
    }),
  )

  expect(endState[todolistId1].length).toBe(7)
  expect(endState[todolistId2].length).toBe(2)
  expect(endState[todolistId1].length).toBe(7)
  expect(endState[todolistId1][0].id).toBeDefined()
  expect(endState[todolistId1][0].title).toBe(newTaskTitle)
  expect(endState[todolistId1][0].status).toBe(TaskStatus.New)
})

test("correct task should change its name", () => {
  const newTitle = "New Title TodoList"

  const endState = tasksReducer(
    startState,
    updateTaskAC({
      todolistId: todolistId1,
      taskId: "1",
      domainModel: {
        title: newTitle,
        status: TaskStatus.Completed,
        deadline: "",
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
      },
    }),
  )

  expect(endState[todolistId1].length).toBe(6)
  expect(endState[todolistId1][0].title).toBe(newTitle)
  expect(endState[todolistId2][0].title).not.toBe(newTitle)
})

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      todolistId: todolistId1,
      taskId: "1",
      domainModel: {
        title: "CSS",
        status: TaskStatus.New,
        deadline: "",
        description: "",
        priority: TaskPriority.Middle,
        startDate: "",
      },
    }),
  )

  expect(endState[todolistId1].length).toBe(6)
  expect(endState[todolistId1][0].status).toBe(TaskStatus.New)
  expect(endState[todolistId2][0].status).toBe(TaskStatus.Completed)
})

test("new array should be added when new todolist is added", () => {
  const newTodoListTitle = "New TodoList"
  const newTodoList: Todolist = {
    id: v1(),
    title: newTodoListTitle,
    addedDate: "",
    order: 1,
  }
  const endState = tasksReducer(startState, addTodolistAC(newTodoList))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
