import { useState, useEffect } from "react";
import ExpensesService from "../../services/expenses.service";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const PublicExpense = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState(null);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("0");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!params.id) {
      navigate("/");
    }

    async function fetchData() {
      const response = await ExpensesService.getPublicById(params.id).catch(
        (err) => {
          navigate("/");
        },
      );

      setId(response.data.expense.id);
      setDescription(response.data.expense.description);
      setValue(Number(response.data.expense.value));
      setDate(
        new Date(response.data.expense.date).toISOString().substring(0, 10),
      );
      setNote(response.data.expense.note);
      setCategory(response.data.expense.category);
      setPaid(response.data.expense.paid);
      setPaymentMethod(response.data.expense.paymentMethod);
    }

    fetchData();
  }, [params.id]);

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
            </tr>
          </thead>

          <tbody>
            <tr key={id}>
              <td>{id}</td>
              <td>{description}</td>
              <td>{value}€</td>
              <td>{new Date(date).toISOString().substring(10, 0)}</td>
              <td>{note}</td>
              <td>{category}</td>
              <td>{paid === true ? "Sim" : "Não"}</td>
              <td>{paymentMethod}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default PublicExpense;
