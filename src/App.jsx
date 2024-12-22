import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./pages/book/list";
import Welcome from "./pages/welcome";
import routes from "./routes/route";

function App() {
	return (
		<Routes>
			<Route path={routes.home.path} element={<Welcome />} />
			<Route path={routes.book.path} element={<List />} />
		</Routes>
	);
}

export default App
