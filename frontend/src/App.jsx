import "/src/styles/main.css"
import Home from './components/main/Home.jsx';
import About from './components/main/About.jsx';
import News from './components/main/News.jsx';
import Heroes from './components/main/Heroes.jsx';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NotFoundCard from "./components/cards/NotFoundCard.jsx";
import PublicLayout from "./components/main/PublicLayout.jsx";
import Login from "./components/admin/pages/Login.jsx";
import Dashboard from "./components/admin/pages/Dashboard.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import {ProtectedRoute} from "./components/admin/routes/ProtectedRoute.jsx";
import AuthProvider from "./components/admin/contexts/AuthContext.jsx";
import HeroesPanel from "./components/admin/pages/HeroesPanel.jsx";
import Hero from "./components/main/items/HeroItem.jsx";
import NewsItem from "./components/main/items/NewsItem.jsx";


export default function App() {



    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/news/:newsId" element={<NewsItem />} />
                    <Route path="/heroes" element={<Heroes />}/>
                    <Route path="/heroes/:heroId" element={<Hero />}/>
                    <Route path="/404" element={<NotFoundCard/>}/>
                </Route>


                <Route element={<AuthProvider/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route element={<ProtectedRoute redirectTo={'/login'}/>}>
                        <Route element={<AdminLayout/>}>
                            <Route path="/admin/dashboard" element={<Dashboard/>}/>
                            <Route path="/admin/heroes" element={<HeroesPanel/>}/>
                        </Route>
                    </Route>

                </Route>

                <Route path="*" element={<Navigate to="/404" replace/>}/>

            </Routes>

        </BrowserRouter>
    )
}