// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Favourites } from "./pages/starwars/Favourites";
import { People } from "./pages/starwars/People";
import { Planets } from "./pages/starwars/Planets";
import { Starships } from "./pages/starwars/Starships";
import { Vehicles } from "./pages/starwars/Vehicles";
import { PlanetDetail } from "./pages/details/PlanetDetail";
import { PeopleDetail } from "./pages/details/PeopleDetail";
import { StarshipDetail } from "./pages/details/StarshipDetail";
import { VehicleDetail } from "./pages/details/VehicleDetail";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        {/* Routes de Star Wars */}
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:id" element={<PlanetDetail />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<StarshipDetail />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />

      </Route>
    )
);