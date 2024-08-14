import { Routes, Route} from 'react-router-dom';
import { Home } from './Components/Home/Home.tsx';
import { Posts } from './Components/Posts/Posts.tsx';
import { Comments } from './Components/Comments/Comments.tsx';
import { Photos } from './Components/Photos/Photos.tsx';
import { Albums } from './Components/Albums/Albums.tsx';
import { Todos } from './Components/Todos/Todos.tsx';
import { Users } from './Components/Users/Users.tsx';
import { NotFound } from './Components/NotFound/NotFound.tsx';
import './App.css';
import './Components/Pagination/Pagination.css';
import { Header } from './Components/Header/Header.tsx';


function App() {

    return (
        <>
            <Header/>
            <main className='mane-container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/comments' element={<Comments />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/photos' element={<Photos />} />
                    <Route path='/albums' element={<Albums />} />
                    <Route path='/todos' element={<Todos />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}
export default App;
