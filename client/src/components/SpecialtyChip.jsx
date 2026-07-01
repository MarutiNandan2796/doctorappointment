export default function SpecialtyChip({ label, active, onClick }) {
  return (
    <button className={`specialty-chip ${active ? 'active' : ''}`} onClick={onClick} type="button">
      {label}
    </button>
  );
}
