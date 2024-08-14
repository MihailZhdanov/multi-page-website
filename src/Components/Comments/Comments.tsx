import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CircularProgress } from "@mui/material";
import './Comments.css'
const Comments = () => {
    const [allComments, setAllComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const commentsPerPage = 10;

    useEffect(() => {
        const getAllComments = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/comments',
                { method: 'Get' });
            const data = await res.json();
            setAllComments(data);
            setIsLoading(false);
        };
        getAllComments();
    }, []);

    const offset = currentPage * commentsPerPage;
    const currentComments = allComments.slice(offset, offset + commentsPerPage);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <div className="comments-container">
            <h1 className="title">Yours comments</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>
                        <div className="comments-grid">
                            {currentComments.map((comment: { id: number; name: string; email: string; body: string }) => (
                                <div key={comment.id} className="comment">
                                    <h3>{comment.name}</h3>
                                    <p>{comment.email}</p>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                        </div>
                        <div className="paginationField">
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(allComments.length / commentsPerPage)}
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

export { Comments };
