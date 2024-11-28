import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateReview from "./pages/CreateReview";
import ShowReview from "./pages/ShowReview";
import EditReview from "./pages/EditReview";
import DeleteReview from "./pages/DeleteReview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reviews/create" element={<CreateReview />} />
      <Route path="/reviews/details/:id" element={<ShowReview />} />
      <Route path="/reviews/edit/:id" element={<EditReview />} />
      <Route path="/reviews/delete/:id" element={<DeleteReview />} />
    </Routes>
  );
};

export default App;
