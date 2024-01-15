import { useState, useEffect } from 'react';
import StudentsService from "../../../services/students.service";
import { Link } from 'react-router-dom';

const StudentsList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await StudentsService.getAll();
            setStudents(data.data);
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

                    <Link to={"/student"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Número</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Aniversário</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td >{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.number}</td>
                                <td>{student.city}</td>
                                <td>{student.birthday}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/student/${student.number}`} className='btn btn-primary me-2'>Editar</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default StudentsList;