import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";

const Welcome = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
           <h1 className="text-4xl font-bold text-blue-500">
                <Link to={routes.book.path} className="text-red-600">click here</Link> to visit the book page
            </h1>
        </div>
    );
}

export default Welcome;