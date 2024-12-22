import React, { useState } from "react";
import InputLabel from "../../components/InputLabel";
import InputError from "../../components/InputError";
import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";
import PrimaryButton from "../../components/PrimaryButton";
import { formController } from "./controller/formController";

const Form = ({handleCloseModal, book, refreshTable}) => {
    const { formData, errors, setData, handleSubmit } = formController(handleCloseModal, book, refreshTable);

    return (
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    value={formData.title || ""}
                    onChange={(value) => setData("title", value)}
                    className="mt-1 block w-full"
                />
                <InputError className="mt-1" message={errors.title} />
            </div>
            <div>
                <InputLabel htmlFor="author" value="Author" />
                <TextInput
                    id="author"
                    value={formData.author || ""}
                    onChange={(value) => setData("author", value)}
                    className="mt-1 block w-full"
                />
                <InputError className="mt-1" message={errors.author} />
            </div>
            <div>
                <InputLabel htmlFor="year" value="Year" />
                <NumberInput id="year"
                    value={formData.year || ""}
                    onChange={(min) => setData("year", min)}
                    placeholder="Enter the specific year"
                    className="mt-1 block w-full"
                />
                <InputError className="mt-1" message={errors.year} />
            </div>
            <div className="flex justify-end mt-4">
                <PrimaryButton type="submit" className="mt-4 px-4 py-2 ml-2">Save</PrimaryButton>
                <PrimaryButton type="button" onClick={handleCloseModal} className="mt-4 px-4 py-2 ml-2">Close</PrimaryButton>
            </div>
        </form>
    );
}

export default Form;