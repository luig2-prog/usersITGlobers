// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/auth.service";

// const UsersList = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("🚀 ~ useEffect ~ authService:", authService);
//     if (!authService.isAuthenticated()) {
//       navigate("/login");
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await authService.getUsers();
//         setUsers(response.data);
//       } catch (error) {
//         setError(error.message);
//         if (error.message.includes("token")) {
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await authService.logout();
//       navigate("/login");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Users List</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="bg-white shadow overflow-hidden sm:rounded-md">
//           <ul className="divide-y divide-gray-200">
//             {users.map((user) => (
//               <li key={user._id} className="px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {user.firstName} {user.paternalLastName} {user.maternalLastName}
//                     </h3>
//                     <p className="text-sm text-gray-500">ID: {user._id}</p>
//                     <p className="text-sm text-gray-500">Username: {user.username}</p>
//                     <p className="text-sm text-gray-500">Phone: {user.phoneNumber}</p>
//                     {user.email && <p className="text-sm text-gray-500">Email: {user.email}</p>}
//                     <p className="text-sm text-gray-500">Creado: {new Date(user.createdAt).toLocaleString()}</p>
//                     <p className="text-sm text-gray-500">Actualizado: {new Date(user.updatedAt).toLocaleString()}</p>
//                     <p className="text-sm text-gray-500">Versión: {user.__v}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;
