import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LeaderBoard from "../pages/leaderboard";
import Admin from "../pages/admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/leaderboard",
        element: <LeaderBoard />
    },
    {
        path: "/nopeThisIsNotTheAdminPage",
        element: <Admin />
    },
    {
        path: "/blocked",
        element: <div>User Blocked for offensive name</div>
    }
])

export default router