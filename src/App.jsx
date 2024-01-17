import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute";
import PublicRoutes from "./utils/publicRoute";

//PUBLIC ROUTES
import Home from "./components/public/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";
import PublicExpense from "./components/public/expense";

//PRIVATE ROUTES
import Dashboard from "./components/secure/Dashboard";
import ExpensesList from "./components/secure/expenses/ExpensesList";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import Expense from "./components/secure/expenses/Expense";

const App = () => {
  return (
    <div>
      <div className="container mt-3">
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses-list" element={<ExpensesList />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/expense/:id" element={<Expense />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="/publico/:id" element={<PublicExpense />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
