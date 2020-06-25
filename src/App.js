import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/rodrigoffinger/gostack-conceitos-reactjs",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // api.delete("/repositories/" + id).then(() => {
    //   api.get("/repositories").then((response) => {
    //     setRepositories(response.data);
    //   });
    // });

    api.delete("/repositories/" + id).then(() => {
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      const repositoriesAfterDelete = [...repositories];
      repositoriesAfterDelete.splice(repositoryIndex, 1);
      setRepositories(repositoriesAfterDelete);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
