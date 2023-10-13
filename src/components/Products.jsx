import { useState } from "react";

function SearchBar({ filterText, setFilterText }) {
  return (
    <div>
      <input
        type="text"
        placeholder="search product..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <td colSpan="2">{category}</td>
    </tr>
  );
}

function ProductRow({ name, price }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText }) {
  const sortedProducts = products.sort((a, b) => a["category"].localeCompare(b["category"], "uk"));
  const rows = [];
  let lastCategory = null;

  sortedProducts.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />);
      lastCategory = product.category;
    }
    rows.push(<ProductRow name={product.name} price={product.price} />);
  });

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Price</th>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      <ProductTable products={products} filterText={filterText} />
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

  return (
    <div className="product-table">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}