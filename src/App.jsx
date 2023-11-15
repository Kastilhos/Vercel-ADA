import { useEffect, useState } from "react";
import MeuButton from "./MeuButton";
import styles from "./button.module.css";

const minhaLista = [
  { id: 1, ingrediente: "feijão" },
  { id: 2, ingrediente: "arroz" },
  { id: 3, ingrediente: "cebola" },
  { id: 4, ingrediente: "alho" },
];

function App() {
  const [contador, setContador] = useState(0);
  const [ingredientes, setProdutos] = useState(minhaLista);
  const [pesquisa, setPesquisa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      const resultado = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const resultadoFinal = await resultado.json();

      return resultadoFinal;
    }

    buscarDados().then((res) => setTarefas(res));
  }, []);
  /* (res) => console.log(res) */

  useEffect(() => {
    if (pesquisa) {
      const novaLista = minhaLista.filter((item) => {
        return item.ingrediente.toLowerCase().includes(pesquisa.toLowerCase());
      });
      setProdutos(novaLista);
    } else {
      setProdutos(minhaLista);
    }
  }, [pesquisa]);

  function aumentar() {
    setContador(contador + 1);
  }

  return (
    <>
      <div className="container">
        <h1>{contador}</h1>
        <MeuComponente />
        {/* <MeuButton onClick={aumentar} conteudo="Me clique" /> */}
        <button className={styles.myButton} onClick={aumentar}>
          Me clique
        </button>
        <input
          placeholder="Seach ingredient"
          type="text"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <ul>
          {tarefas.map((value) => {
            return <li key={value.id}>{value.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export function MeuComponente() {
  return <p>Testando fetch</p>;
}

export default App;
