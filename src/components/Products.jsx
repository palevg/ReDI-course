import { useState } from "react";
import "../styles/products.css";

function SearchBar({ filterText, setFilterText, inStockOnly, setInStockOnly }) {
  return (
    <form>
      <input
        type="text"
        placeholder="search product..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)} />
      <label className="check-stock">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <td colSpan="2" align="center">{category}</td>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td className="name-col">{name}</td>
      <td align="center">{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const sortedProducts = products.sort((a, b) => a["category"].localeCompare(b["category"], "uk"));
  const rows = [];
  let lastCategory = null;

  sortedProducts.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
    if (inStockOnly && !product.stocked) return;

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.name} />);
  });

  return (
    <table>
      <thead className="products-table">
        <tr>
          <th className="name-col">Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="products">
      <SearchBar filterText={filterText} setFilterText={setFilterText} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

export default function Products() {
  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  return <FilterableProductTable products={PRODUCTS} />;
}