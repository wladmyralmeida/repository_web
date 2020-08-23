import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio Node.js",
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: [
        "Node.js",
        "Flutter",
        "React Native"
      ],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    //Não usa response pois não retorna nada!
    await api.delete(`repositories/${id}`);

    //Mantendo(Filtrando) apenas nos repositórios, os repositórios que tem IDS diferentes do qual foi removido;
    setRepositories(repositories.filter(
      repo => repo.id !== id
    ));
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
