import React, { useState } from "react";
import routes from "../../../routes/route";
import Swal from "sweetalert2";

export const formController = (handleCloseModal, book, refreshTable) => {
    const [formData, setFormData] = useState({
        title: book ? book.title : "",
        author: book ? book.author : "",
        year: book ? book.year : "",
    });

    const setData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Save data?",
            text: "Make sure the input data is correct",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Save!",
            cancelButtonText: "Cancle",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const url = book ? `/book/update/${book.id}` : "/book/create";
                    const method = book ? "PUT" : "POST";

                    const response = await fetch(routes.api.path+url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.status === 422) {
                        const data = await response.json();
                        if (data.errors) {
                            setErrors(data.errors);
                        }
                        Swal.fire({
                            title: "Validation Error",
                            text: "Please correct the highlighted fields.",
                            icon: "error",
                        });
                        return;
                    }

                    if (!response.ok) {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong. Please try again later.",
                            icon: "error",
                        });
                        return;
                    }
                    
                    const data = await response.json();
                    Swal.fire({
                        title: "Saved!",
                        text: data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        handleCloseModal();
                        refreshTable();
                    });
                } catch (error) {
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error saving the form. Please check the errors.",
                            icon: "error",
                        });
                    }
                }
            }
        });
    }

    return {
        formData,
        errors,
        setData,
        handleSubmit,
    };
};