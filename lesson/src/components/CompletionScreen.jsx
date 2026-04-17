import './CompletionScreen.css';

// Kiddom logo mark as inline SVG (from assets/kiddom-logo.svg)
function KiddomMark() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-label="Kiddom">
      <circle cx="32" cy="32" r="32" fill="#F25B44" />
      <text x="32" y="38" textAnchor="middle" fill="white" fontSize="26" fontWeight="700" fontFamily="-apple-system, sans-serif">K</text>
    </svg>
  );
}

export default function CompletionScreen() {
  return (
    <div className="completion">
      <div className="completion__icon">
        <KiddomMark />
      </div>

      <h1 className="completion__heading">Nice work!</h1>
      <p className="completion__subheading">Lesson 1 complete</p>

      <div className="completion__summary card">
        <p className="completion__summary-text">
          Covering a region with shapes that have no gaps or overlaps is called <strong>tiling</strong> the plane.
          Comparing which shapes cover more of the plane is the start of reasoning about <strong>area</strong>.
        </p>
      </div>

      <div className="completion__next">
        <p className="completion__next-label">Up next</p>
        <p className="completion__next-title">Lesson 2 — Finding Area by Decomposing and Rearranging</p>
      </div>
    </div>
  );
}
