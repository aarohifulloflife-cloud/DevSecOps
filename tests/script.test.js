const { addTask, deleteTask, toggleTask, countTasks } = require("../src/js/script");

describe("addTask", () => {
  test("adds a new task to an empty list", () => {
    const result = addTask([], "Buy milk");
    expect(result.length).toBe(1);
    expect(result[0].text).toBe("Buy milk");
    expect(result[0].completed).toBe(false);
  });

  test("trims whitespace from task text", () => {
    const result = addTask([], "  Walk dog  ");
    expect(result[0].text).toBe("Walk dog");
  });

  test("rejects empty strings", () => {
    expect(addTask([], "")).toEqual([]);
    expect(addTask([], "   ")).toEqual([]);
  });
});

describe("deleteTask", () => {
  test("removes the task with matching id", () => {
    const tasks = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: false }
    ];
    expect(deleteTask(tasks, 1)).toEqual([{ id: 2, text: "B", completed: false }]);
  });
});

describe("toggleTask", () => {
  test("flips the completed flag", () => {
    const tasks = [{ id: 1, text: "A", completed: false }];
    expect(toggleTask(tasks, 1)[0].completed).toBe(true);
  });
});

describe("countTasks", () => {
  test("returns the number of tasks", () => {
    expect(countTasks([])).toBe(0);
    expect(countTasks([{ id: 1 }, { id: 2 }])).toBe(2);
  });
});