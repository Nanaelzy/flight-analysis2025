export default function Card({ title, sub, wide, children }) {
  return (
    <div className="card" style={wide ? { gridColumn: '1/-1' } : undefined}>
      <h3>{title}</h3>
      {sub && <p>{sub}</p>}
      {children}
    </div>
  );
}
