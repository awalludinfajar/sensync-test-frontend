import React from "react";
import EditButton from "../../components/EditButton"
import RemoveButton from "../../components/RemoveButton"
import { tableController } from "./controller/tableController";

const Table = ({handleEventModal, searchQuery, refreshTable}) => {
    const {filterData, loading, handleDelete} = tableController(searchQuery, refreshTable);

    if (loading) {
        return <div>Loading...</div>
    }

    const tHead = ["No.", "Title", "Author", "Year", "Action"];
    return (
        <>
            <div className="overflow-x-auto">
                <table id="product-table" className="min-w-full table-auto border-collapse border border-gray-300" >
                    <thead>
                    <tr className="bg-gray-200 text-left">
                            {tHead.map((fill, index) => (
                                <th 
                                    key={index}
                                    className={`border border-gray-300 ${fill === "No." || fill === "Action" ? 'px-2 py-1' : 'px-4 py-2'}`}
                                >
                                    {fill}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((book, index) => (
                            <tr key={book.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-2 py-1">{index+1}</td>
                                <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                                <td className="border border-gray-300 px-4 py-2">{book.year}</td>
                                <td className="border border-gray-300 px-4 py-1">
                                    <EditButton onClick={() => handleEventModal(book)} />
                                    <RemoveButton onClick={() => handleDelete(book.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;