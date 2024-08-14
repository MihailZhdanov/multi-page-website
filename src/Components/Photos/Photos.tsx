import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CircularProgress } from "@mui/material";
const Photos = () => {
    const [allPhotos, setAllPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const photosPerPage = 10;
    useEffect(() => {
        const getAllPhotos = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/photos',
                { method: 'Get' });
            const data = await res.json();
            setAllPhotos(data);
            setIsLoading(false);
        };
        getAllPhotos();
    }, []);

    const offset = currentPage * photosPerPage;
    const currentPhotos = allPhotos.slice(offset, offset + photosPerPage);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <div>
            <h1>Yours Photos</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>
                        <ul>
                            {currentPhotos.map((photo: { id: number; title: string; thumbnailUrl: string }) => (
                                <li key={photo.id}>
                                    <h3>{photo.title}</h3>
                                    <img src={photo.thumbnailUrl} />
                                </li>
                            ))}
                        </ul>
                        <div className="paginationField">
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={Math.ceil(allPhotos.length / photosPerPage)}
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

export { Photos };