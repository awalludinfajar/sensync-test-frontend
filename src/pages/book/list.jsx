import React, { useState } from "react";
import MainLayout from "../../layouts/mainLayout";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import Table from "./table";
import Modal from "../../components/Modal";
import Form from "./form";

const List = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false); 
    const [search, setSearch] = useState("");

    const handleEventModal = (val) => {
        setSelectedBook(val);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    }

    const triggerTableRefresh = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <MainLayout header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">List of Book</h2>
        }>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section>
                            <div className="flex flex-col md:flex-row items-center mb-4 md:justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                                    <TextInput
                                        value=""
                                        onChange={(newValue) => setSearch(newValue)}
                                        placeholder="Find By Title..."
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <PrimaryButton onClick={() => handleEventModal(null)}>Create new</PrimaryButton>
                                </div>
                            </div>
                            <Table handleEventModal={handleEventModal} searchQuery={search} refreshTable={refreshTable} />
                        </section>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="2xl">
                <div className="p-4">
                    <h2 className="text-lg font-bold">Form Input Book</h2>
                    <Form handleCloseModal={handleCloseModal} book={selectedBook} refreshTable={triggerTableRefresh} />
                </div>
            </Modal>
        </MainLayout>
    );
}

export default List;