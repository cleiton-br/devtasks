export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="sort-bar">
      <label>Ordenar por:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Mais recentes primeiro</option>
        <option value="oldest">Mais antigas primeiro</option>
        <option value="priority-high">Prioridade (alta → baixa)</option>
        <option value="priority-low">Prioridade (baixa → alta)</option>
        <option value="title-asc">Título (A → Z)</option>
        <option value="title-desc">Título (Z → A)</option>
      </select>
    </div>
  );
}