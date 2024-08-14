import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CircularProgress } from "@mui/material";
import './Posts.css'

const Posts = () => {

    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const postsPerPage = 10;

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/posts',
                { method: 'Get' });
            const data = await res.json();
            setAllPosts(data);
            setIsLoading(false);
        };
        getAllPosts();
    }, []);

    const offset = currentPage * postsPerPage;
    const currentPosts = allPosts.slice(offset, offset + postsPerPage);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <div className="posts-container">
            <h1 className="title">Posts for you</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>
                        <div className="post-grid">
                            {currentPosts.map((post: { id: number; title: string; body: string }) => (
                                <div key={post.id} className="post">
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                </div>
                            ))}
                        </div>
                        <div className="paginationField">
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(allPosts.length / postsPerPage)}
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

export { Posts };