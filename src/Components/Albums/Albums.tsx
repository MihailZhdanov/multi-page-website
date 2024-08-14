import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CircularProgress } from "@mui/material";

const Albums = () => {
    const [allAlbums, setAllAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const albumsPerPage = 10;
    useEffect(() => {
        const getAllAlbums = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/albums',
                { method: 'Get' });
            const data = await res.json();
            setAllAlbums(data);
            setIsLoading(false);
        };
        getAllAlbums();
    }, []);

    const offset = currentPage * albumsPerPage;
    const currentAlbums = allAlbums.slice(offset, offset + albumsPerPage);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <div>
            <h1>Yours Album</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>
                        <ul>
                            {currentAlbums.map((album: { id: number; title: string }) => (
                                <li key={album.id}>
                                    <h3>{album.title}</h3>
                                </li>
                            ))}
                        </ul>
                        <div className="paginationField">
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(allAlbums.length / albumsPerPage)}
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

export { Albums };