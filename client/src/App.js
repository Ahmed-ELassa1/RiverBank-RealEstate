import { Route, RouterProvider, Routes, createBrowserRouter, createHashRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashLayout from "./layouts/DashLayout/DashLayout";
import {
  Home,
  Cities,
  Developers,
  Properties,
  Blogs,
  Projects,
  ProjectDetails,
  ContactUs,
  CreateProperty,
  PropertiesDetails,
  ProjectsList,
  CreateProject,
  ProjectsDetails,
  BlogsList,
  BlogsDetails,
  CreateBlog,
  ClientInfoList,
  ClientInfoDetails,
  DevelopersList,
  CreateDeveloper,
  DevelopersDetails,
  PropertiesList,
  Login,
  ForgotPassword,
  UpdatePassword,
} from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const routers = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/cities", element: <Cities /> },
        { path: "/developers", element: <Developers /> },
        { path: "/properties", element: <Properties /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/projects", element: <Projects /> },
        { path: "/projects/:id", element: <ProjectDetails /> },
        { path: "/contactUs", element: <ContactUs /> },
        {
          path: "/login", element: < Login />
        },
        {
          path: "/forgotPassword", element: < ForgotPassword />
        },
        {
          path: "/updatePassword", element: < UpdatePassword />
        },
      ]
    },
    {
      path: "/dashboard",
      element: <DashLayout />,
      children: [
        { path: "/dashboard", index: true, element: <ProtectedRoute><PropertiesList /></ProtectedRoute> },
        { path: "/dashboard/properties", element: <ProtectedRoute><PropertiesList /></ProtectedRoute> },
        { path: "/dashboard/properties/create", element: <ProtectedRoute><CreateProperty /></ProtectedRoute> },
        { path: "/dashboard/properties/view/:id", element: <ProtectedRoute><PropertiesDetails /></ProtectedRoute> },
        { path: "/dashboard/projects", element: <ProtectedRoute><ProjectsList /></ProtectedRoute> },
        { path: "/dashboard/projects/create", element: <ProtectedRoute><CreateProject /></ProtectedRoute> },
        { path: "/dashboard/projects/view/:id", element: <ProtectedRoute><ProjectsDetails /></ProtectedRoute> },
        { path: "/dashboard/blogs", element: <ProtectedRoute><BlogsList /></ProtectedRoute> },
        { path: "/dashboard/blogs/create", element: <ProtectedRoute><CreateBlog /></ProtectedRoute> },
        { path: "/dashboard/blogs/view/:id", element: <ProtectedRoute><BlogsDetails /></ProtectedRoute> },
        { path: "/dashboard/clientInfo", element: <ProtectedRoute><ClientInfoList /></ProtectedRoute> },
        { path: "/dashboard/clientInfo/view/:id", element: <ProtectedRoute><ClientInfoDetails /></ProtectedRoute> },
        { path: "/dashboard/developers", element: <ProtectedRoute><DevelopersList /></ProtectedRoute> },
        { path: "/dashboard/developers/create", element: <ProtectedRoute><CreateDeveloper /></ProtectedRoute> },
        { path: "/dashboard/developers/view/:id", element: <ProtectedRoute><DevelopersDetails /></ProtectedRoute> },
      ]
    },
  ])
  return (
    <>
      <RouterProvider router={routers} />
      < ToastContainer
        limit={6}
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
      />
    </ >
  );
}

export default App;
