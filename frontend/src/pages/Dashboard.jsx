import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete project documentation", description: "Write comprehensive docs for the new feature", completed: false, priority: "high" },
    { id: 2, title: "Review pull requests", description: "Check pending PRs from team members", completed: true, priority: "medium" },
    { id: 3, title: "Update dependencies", description: "Upgrade to latest versions", completed: false, priority: "low" },
  ]);
  
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleLogout = () => {
    logout();
  };

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        priority: "medium"
      };
      setTasks([newTask, ...tasks]);
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && !task.completed) ||
                         (filterStatus === "completed" && task.completed);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <span className="inline-block w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Task Dashboard
            </h1>
            <p className="text-gray-600 ml-1">Manage your daily tasks efficiently</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Active</p>
                <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto border border-gray-100 backdrop-blur-sm bg-opacity-90">
          <div className="p-6 md:p-8">
            {/* Add Task Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Task
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <input
                  type="text"
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="md:col-span-4 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="md:col-span-6 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
                <button 
                  onClick={addTask}
                  className="md:col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
            </div>

            {/* Filter & Search Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-5 py-3 rounded-xl font-medium transition ${filterStatus === "all" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("active")}
                  className={`px-5 py-3 rounded-xl font-medium transition ${filterStatus === "active" ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-5 py-3 rounded-xl font-medium transition ${filterStatus === "completed" ? "bg-green-500 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 text-lg">No tasks found</p>
                  <p className="text-gray-400 text-sm mt-2">Add a new task to get started!</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-5 rounded-xl shadow-md border-2 transition-all hover:shadow-lg ${
                      task.completed 
                        ? "bg-green-50 border-green-200" 
                        : "bg-white border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                          task.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-purple-500"
                        }`}
                      >
                        {task.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg mb-1 ${task.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                            {task.description}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
