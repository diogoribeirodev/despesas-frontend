import { useState, useEffect } from "react";
import ExpensesService from "../../../services/expenses.service";
import { Link } from "react-router-dom";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await ExpensesService.getAll();
      setExpenses(data.data.expenses);
      console.log(data.data.expenses);
    }

    fetchData();
  }, []);

  return (
    <main>
      <section className="py-4">
        <div className="d-flex justify-content">
          <Link to={"/"} className="btn btn-secondary px-4 mx-2">
            Voltar
          </Link>

          <Link to={"/expense"} className="btn btn-success px-4 mx-2">
            Criar
          </Link>
        </div>
      </section>

      <section>
        <table className="table table-dark table-hover text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
              <th scope="col">Valor (€)</th>
              <th scope="col">Data</th>
              <th scope="col">Notas</th>
              <th scope="col">Categoria</th>
              <th scope="col">Pago</th>
              <th scope="col">Método de Pagamento</th>
              <th scope="col">Público</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.description}</td>
                <td>{expense.value}€</td>
                <td>{new Date(expense.date).toISOString().substring(10, 0)}</td>
                <td>{expense.note}</td>
                <td>{expense.category}</td>
                <td>{expense.paid === true ? "Sim" : "Não"}</td>
                <td>{expense.paymentMethod}</td>
                <td>{expense.publico === true ? "Sim" : "Não"}</td>
                <td>
                  <div className="d-flex justify-content">
                    <Link
                      to={`/expense/${expense.id}`}
                      className="btn btn-primary me-2"
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ExpensesList;
