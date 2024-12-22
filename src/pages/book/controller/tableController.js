import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import routes from "../../../routes/route";

export const tableController = (searchQuery, refreshTable) => {
    const [data, setData] = useState([]);
    const [filterData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(routes.api.path+"/book/list");
                const res = await response.json();
                
                setData(res.data);
                setLoading(false);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Error fetching, can't connect to server message: "+error,
                    icon: "error",
                });
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshTable]);

    useEffect(() => {
        const filterd = data.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filterd);
    }, [searchQuery, data]);

    const handleDelete = (val) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The data will be deleted forever",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(routes.api.path+`/book/delete/${val}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong. Please try again later.",
                        icon: "error",
                    });
                    return;
                }

                Swal.fire({
                    title: "Deleted!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setData((prevData) => prevData.filter((book) => book.id !== val));
                });
            }
        });
    }
    
    return {
        data,
        filterData,
        loading,
        handleDelete,
    };
};