import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import ExpensesService from "../../../services/expenses.service";

const Expense = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [id, setId] = useState(null);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [successful, setSuccessful] = useState(null);
  const [publico, setPublico] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!params.id) {
      return;
    }

    async function fetchData() {
      const response = await ExpensesService.getById(params.id);

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
      setPublico(response.data.expense.publico);
    }

    fetchData();
  }, [params.id]);

  const form = useRef();
  const checkBtn = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      ExpensesService.createORupdate(
        id,
        description,
        value,
        date,
        note,
        category,
        paid,
        paymentMethod,
        publico,
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          setId(response.data.id);
          setDescription(response.data.description);
          setValue(response.data.value);
          setDate(new Date(response.data.date).toISOString());
          setNote(response.data.note);
          setCategory(response.data.category);
          setPaid(response.data.paid);
          setPaymentMethod(response.data.paymentMethod);
          setPublico(response.data.public);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        },
      );
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    ExpensesService.deleteExpense(id).then(
      (response) => {
        navigate("/expenses-list");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      },
    );
  };

  const required = (value) => {
    if (!value) {
      return <div className="invalid-feedback d-block">É obrigatório!</div>;
    } else if (value.length < 3) {
      return (
        <div className="invalid-feedback d-block">
          Tem de ter mais de 3 caracteres!
        </div>
      );
    }
  };

  const valor = (value) => {
    if (value <= 0) {
      return (
        <div className="invalid-feedback d-block">
          Tem de ser um número acima de 0!
        </div>
      );
    }
  };

  return (
    <main>
      <section>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <Form onSubmit={handleRegister} ref={form} className="col-4">
              <div>
                <h1 className="h3 mb-3 fw-normal">Criar</h1>

                <div className="form-group">
                  <label>Descrição</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label>Valor</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="value"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    validations={[valor]}
                  />
                </div>

                <div className="form-group">
                  <label>Data</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="date"
                    value={date}
                    onChange={(e) =>
                      setDate(
                        new Date(e.target.value).toISOString().substring(0, 10),
                      )
                    }
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label>Notas</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label>Categoria</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label>Pago</label>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="paid"
                      id="paid1"
                      onChange={() => setPaid(true)}
                      checked={paid === true}
                    />
                    <label className="form-check-label" htmlFor="paid1">
                      Sim
                    </label>
                  </div>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="paid"
                      id="paid2"
                      onChange={() => setPaid(false)}
                      checked={paid === false}
                    />
                    <label className="form-check-label" htmlFor="paid2">
                      Não
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Método de Pagamento</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Público</label>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="publico"
                      id="publico1"
                      onChange={() => setPublico(true)}
                      checked={publico === true}
                    />
                    <label className="form-check-label" htmlFor="publico1">
                      Sim
                    </label>
                  </div>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="publico"
                      id="publico2"
                      onChange={() => setPublico(false)}
                      checked={publico === false}
                    />
                    <label className="form-check-label" htmlFor="publico2">
                      Não
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <button className="btn btn-success mt-2">
                    {id ? "Alterar" : "Criar"}
                  </button>

                  {id && (
                    <button
                      onClick={handleDelete}
                      className="btn btn-danger mt-2 mx-2"
                    >
                      Eliminar
                    </button>
                  )}

                  <Link
                    to={"/expenses-list"}
                    className="btn btn-secondary mt-2 mx-2"
                  >
                    Voltar
                  </Link>
                </div>
              </div>

              {successful && (
                <div className="alert alert-success mt-2" role="alert">
                  Gravado com sucesso!
                </div>
              )}

              {message && successful !== null && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Expense;
