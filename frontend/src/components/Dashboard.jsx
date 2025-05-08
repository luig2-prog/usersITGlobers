import { useState, useEffect } from "react";
import authService from "../services/auth.service";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await authService.getUsers();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      setError(error.error || "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Lista de Usuarios</h2>
          <ul className="space-y-6">
            {users.map((user) => (
              <li
                key={user._id || user.id}
                className="border border-gray-200 rounded-md p-4 flex flex-col items-center bg-gray-50"
              >
                <p className="text-lg font-semibold text-gray-900 mb-1 text-center">
                  {user.firstName} {user.paternalLastName} {user.maternalLastName}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 w-full max-w-2xl">
                  <span className="text-sm text-gray-500">ID:</span>
                  <span className="text-sm text-gray-700 break-all">{user._id || user.id}</span>
                  <span className="text-sm text-gray-500">Username:</span>
                  <span className="text-sm text-gray-700">{user.username}</span>
                  <span className="text-sm text-gray-500">Teléfono:</span>
                  <span className="text-sm text-gray-700">{user.phoneNumber}</span>
                  {user.email && (
                    <>
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </>
                  )}
                  <span className="text-sm text-gray-500">Creado:</span>
                  <span className="text-sm text-gray-700">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : ""}
                  </span>
                  <span className="text-sm text-gray-500">Actualizado:</span>
                  <span className="text-sm text-gray-700">
                    {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : ""}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
