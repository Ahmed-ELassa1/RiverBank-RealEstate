import { RouterProvider, createHashRouter } from "react-router-dom";

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
import { useEffect, useState } from "react";
import ProjectSearch from "./pages/ProjectSearch/Projects";
import ListBlogsDetails from "./pages/ListBlogsDetails/ListBlogsDetails";
import ListDevelopersDetails from "./pages/ListDevelopersDetails/ListDevelopersDetails";
import CitiesList from "./pages/Dashboard/Cities/CitiesList";
import CreateCity from "./pages/Dashboard/Cities/CreateCity";
import CityDetails from "./pages/Dashboard/Cities/CityDetails";
import ProjectTypeDetails from "./pages/Dashboard/ProjectTypes/ProjectTypeDetails";
import CreateProjectType from "./pages/Dashboard/ProjectTypes/CreateProjectType";
import ProjectTypesList from "./pages/Dashboard/ProjectTypes/ProjectTypesList";
import ProjectType from "./pages/ProjectType/ProjectType";

function App() {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.getElementById("navbar");
      const footer = document.getElementById("footer");
      const sidebar = document.getElementById("details-sidebar");
      const footerTop = footer?.getBoundingClientRect().top;
      const sidebarTop = sidebar?.getBoundingClientRect().top;
      const navBarBottom = navBar?.getBoundingClientRect().bottom;
      if (
        sidebar &&
        sidebarTop <= navBarBottom &&
        footerTop > window.innerHeight &&
        sidebarTop <
          window.innerHeight - (navBar?.getBoundingClientRect().height + 30)
      ) {
        setIsSticky(true);
        sidebar.style.top = navBarBottom + 10 + "px";
      } else if (sidebar && footerTop <= window.innerHeight) {
        setIsSticky(true);
        sidebar.style.top = footerTop - sidebar?.offsetHeight - 15 + "px";
      } else if (sidebar && window.scrollY <= 300 - navBarBottom) {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  const routers = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/search", element: <ProjectSearch /> },
        { path: "/city/:cityId", element: <Cities /> },
        { path: "/type/:projectType", element: <ProjectType /> },
        { path: "/developers", element: <Developers /> },
        { path: "/developers/:id", element: <ListDevelopersDetails /> },
        { path: "/properties", element: <Properties /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/blogs/:id", element: <ListBlogsDetails /> },
        { path: "/projects", element: <Projects /> },
        {
          path: "/projects/:id",
          element: <ProjectDetails isSticky={isSticky} />,
        },
        { path: "/contactUs", element: <ContactUs /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/updatePassword",
          element: <UpdatePassword />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashLayout />,
      children: [
        {
          path: "/dashboard/projects",
          index: true,
          element: (
            <ProtectedRoute>
              <ProjectsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/properties",
          element: (
            <ProtectedRoute>
              <PropertiesList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/properties/create",
          element: (
            <ProtectedRoute>
              <CreateProperty />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/properties/view/:id",
          element: (
            <ProtectedRoute>
              <PropertiesDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projects",
          element: (
            <ProtectedRoute>
              <ProjectsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projects/create",
          element: (
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projects/view/:id",
          element: (
            <ProtectedRoute>
              <ProjectsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/blogs",
          element: (
            <ProtectedRoute>
              <BlogsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/blogs/create",
          element: (
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/blogs/view/:id",
          element: (
            <ProtectedRoute>
              <BlogsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/clientInfo",
          element: (
            <ProtectedRoute>
              <ClientInfoList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/clientInfo/view/:id",
          element: (
            <ProtectedRoute>
              <ClientInfoDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/developers",
          element: (
            <ProtectedRoute>
              <DevelopersList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/developers/create",
          element: (
            <ProtectedRoute>
              <CreateDeveloper />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/developers/view/:id",
          element: (
            <ProtectedRoute>
              <DevelopersDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/cities",
          element: (
            <ProtectedRoute>
              <CitiesList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/cities/create",
          element: (
            <ProtectedRoute>
              <CreateCity />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/cities/view/:id",
          element: (
            <ProtectedRoute>
              <CityDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projectTypes",
          element: (
            <ProtectedRoute>
              <ProjectTypesList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projectTypes/create",
          element: (
            <ProtectedRoute>
              <CreateProjectType />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/projectTypes/view/:id",
          element: (
            <ProtectedRoute>
              <ProjectTypeDetails />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routers} />
      <ToastContainer
        limit={6}
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
      />
    </div>
  );
}

export default App;
