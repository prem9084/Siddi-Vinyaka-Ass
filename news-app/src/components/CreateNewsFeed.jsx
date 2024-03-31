import React, { useState } from "react";

// Task Component to display individual task
const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <div>
      {isEditing ? (
        <div
          className="d-flex flex-column w-50 m-auto  rounded p-4 addnews mt-5 mb-5"
          style={{ border: "1px solid black" }}
        >
          <h3 className="text-center mb-3 mt-3 fw-bold">Update News</h3>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            className="rounded mt-3"
          />
          <input
            type="text"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            className="rounded mt-3"
          />
          <input
            type="text"
            name="content"
            value={updatedTask.content}
            onChange={handleChange}
            className="rounded mt-3"
          />
          <input
            type="text"
            name="category"
            value={updatedTask.category}
            onChange={handleChange}
            className="rounded mt-3"
          />

          <button onClick={handleUpdate} className="btn btn-primary mt-3">
            Update
          </button>
        </div>
      ) : (
        <div>
          <table className="table w-50 m-auto mt-5">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Content</th>
                <th scope="col">Category</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.content}</td>
                <td>{task.category}</td>

                <td>
                  <button onClick={handleEdit} className="btn btn-success">
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// TaskList Component to display list of tasks
const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

// App Component
const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div>
      <h1 className="text-center mb-4">Welcome TO Admin Panel</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
};

// AddTaskForm Component to add new task
const AddTaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({
    id: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(task);
    setTask({
      id: Math.floor(Math.random() * 1000),
      title: "",
      description: "",
      content: "",
      category: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column w-50 m-auto  rounded p-4 addnews"
      style={{ border: "1px solid black" }}
    >
      <h3 className="text-center mt-3 mb-3 fw-bold ">Create News</h3>

      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="rounded mb-2"
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        className="rounded mt-3"
        placeholder="Description"
      />
      <input
        type="text"
        name="content"
        value={task.content}
        onChange={handleChange}
        placeholder="content"
        className="rounded mt-3"
      />
      <input
        type="text"
        name="category"
        value={task.category}
        onChange={handleChange}
        placeholder="Category"
        className="rounded mt-3"
      />

      <button type="submit" className="mt-3 btn btn-success">
        Create News
      </button>
    </form>
  );
};

export default App;
