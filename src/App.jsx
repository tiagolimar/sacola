import { useEffect, useState } from "react";
import { listaDeItens } from "./listaDeItens";

const formatar = (valor,msg="Grátis")=>{
    return valor?valor.toLocaleString('pt-BR',{style:'currency', currency:'BRL'}):msg;
}

const Item = ({item, total}) => {
    const {img_url, nome, preco} = item
    const [quantidade, setQuantidade] = useState(1);

    const subtrair = ()=>{
        const nova_quantidade = +quantidade > 0 ? quantidade - 1 : 0
        setQuantidade(nova_quantidade)
        total(prev=>prev+preco * (nova_quantidade - quantidade))
    }

    const somar = ()=>{
        const nova_quantidade = +quantidade + 1
        setQuantidade(nova_quantidade)
        total(prev=>prev+preco * (nova_quantidade - quantidade))
    }

    return (
        <article className="d-flex border rounded p-2 justify-content-between">
            <div className="item-info d-flex gap-3 fs-5">
                <img src={img_url} className="border rounded" alt="imagem do produto" />
                <p className="item-nome">{nome}</p>
                <p className="item-preco">{formatar(preco)}</p>
            </div>
            <div className="contador d-flex gap-2 bg-light rounded">
                <button className="btn text-danger" onClick={() => subtrair()}>
                    {quantidade > 0 && quantidade != 1? "-" : "🗑"}
                </button>
                <input type="number" className="text-center" value={quantidade} readOnly />
                <button className="btn text-danger" onClick={() => somar()}>+</button>
            </div>
        </article>
    );
};

function App() {
    const [totalParcial, setTotalParcial] = useState(listaDeItens.reduce((add,item) =>add + item.preco,0));
    const minimoGratuidade = 49.9;
    const minimoDesconto = 10.90;
    const desconto = totalParcial>minimoDesconto? 2.9:0;
    const taxaDeEntrega = totalParcial > minimoGratuidade? 0: 5;

    return (
        <main className="m-4">
            <h1 className="text-center">Sacola</h1>
            <section className="d-flex flex-column gap-3 border rounded p-1">
                <h2>Itens adicionados</h2>
                {listaDeItens.map((item, id) => {
                    return <Item key={id} item={item} total={setTotalParcial} />;
                })}
            </section>
            <div className="cupom d-flex justify-content-between mt-4">
                <h3 className="fs-4">Cupom de desconto: </h3>
                <p className={`cupom-valor fs-4 ${desconto?"":"text-danger"}`}>{formatar(desconto,"Adicionar")}</p>
            </div>
            <hr />
            <div className="resumo">
                <h3 className="fs-2 mb-4">Resumo de valores</h3>
                <div className="valor-total d-flex justify-content-between text-secondary fs-5">
                    <h4>Subtotal </h4>
                    <p>{formatar(totalParcial)}</p>
                </div>
                <div className="resumo-taxa d-flex justify-content-between fs-3 text-secondary">
                    <h4>Taxa de entrega </h4>
                    <p className={`resumo-taxa-valor ${taxaDeEntrega?"":"text-success"}`}>{formatar(taxaDeEntrega)}</p>
                </div>
                <hr />
                <div className="resumo-total d-flex justify-content-between">
                    <h4 className="fs-3">Total </h4>
                    <p className="fs-4 fw-bold">{formatar(totalParcial-desconto+taxaDeEntrega)}</p>
                </div>
                <hr />
            </div>
        </main>
    );
}

export default App;

