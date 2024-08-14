import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CircularProgress } from "@mui/material";
import './Todos.css'
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
const Todos = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const todosPerPage = 10;

    useEffect(() => {
        const getAllTodos = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/todos',
                { method: 'Get' });
            const data = await res.json();
            setAllTodos(data);
            setIsLoading(false);
        };
        getAllTodos();
    }, []);

    const offset = currentPage * todosPerPage;
    const currentTodos = allTodos.slice(offset, offset + todosPerPage);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    const handleCheckboxChange = (id: number) => {
        setAllTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="todos-container">
            <h1 className="title-todos">Yours Todos</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>
                        <div className="todos-grid">
                            {currentTodos.map((todo: { id: number; title: string; completed: boolean }) => (
                                <div key={todo.id} className="todos">
                                    <h3>{todo.title}</h3>
                                    <input type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleCheckboxChange(todo.id)} />
                                </div>
                            ))}
                        </div>
                        <div className="paginationField">
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(allTodos.length / todosPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                forcePage={currentPage}
                            />
                        </div>
                    </>
            }
        </div>
    )
}

export { Todos };